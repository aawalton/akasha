import { expect, test } from "bun:test"
import type { Ledger, NodeCapacity } from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"
import {
  applyReservations,
  RESERVATION_TTL_MS,
  reconcileLedger,
  recordAdmissions,
} from "./ci-dispatch-reservations.module.code.ts"

const NOW = 1_000_000

const held: Ledger = [
  {
    containerName: "pe-1-a-abc1234",
    node: "node-01",
    cpuMillis: 500,
    memoryBytes: 1024,
    admittedAtMs: NOW,
  },
]

const node: NodeCapacity = {
  nodeName: "node-01",
  cpuMillisAvailable: 2000,
  memoryBytesAvailable: 4096,
  cpuMillisCapacity: 8000,
  memoryBytesCapacity: 16384,
}

test("a reservation is dropped once the cluster reports the container it stands for", () => {
  expect(reconcileLedger(held, new Set(["pe-1-a-abc1234"]), NOW, RESERVATION_TTL_MS)).toEqual([])
})

test("a reservation the cluster never reports is dropped once it outlives its time to live", () => {
  expect(reconcileLedger(held, new Set(), NOW + RESERVATION_TTL_MS, RESERVATION_TTL_MS)).toEqual([])
  expect(reconcileLedger(held, new Set(), NOW + 1, RESERVATION_TTL_MS)).toEqual(held)
})

test("a reservation is taken out of the room its node reports", () => {
  const [after] = applyReservations([node], held)
  expect(after?.cpuMillisAvailable).toBe(1500)
  expect(after?.memoryBytesAvailable).toBe(3072)
})

test("a reservation never takes a node below no room at all", () => {
  const big: Ledger = [{ ...(held[0] as Ledger[number]), cpuMillis: 99999, memoryBytes: 99999 }]
  const [after] = applyReservations([node], big)
  expect(after?.cpuMillisAvailable).toBe(0)
  expect(after?.memoryBytesAvailable).toBe(0)
})

test("a node no reservation names is handed back unchanged", () => {
  expect(applyReservations([node], [])).toEqual([node])
})

test("a container already reserved is not reserved a second time", () => {
  const again = recordAdmissions(
    held,
    [
      {
        containerName: "pe-1-a-abc1234",
        node: "node-01",
        requests: { cpuMillis: 500, memoryBytes: 1024 },
      },
    ],
    NOW + 5
  )
  expect(again).toEqual(held)
})

test("a container not yet reserved is added at the moment it was admitted", () => {
  const grown = recordAdmissions(
    held,
    [
      {
        containerName: "pe-2-b-abc1234",
        node: "node-02",
        requests: { cpuMillis: 100, memoryBytes: 512 },
      },
    ],
    NOW + 5
  )
  expect(grown.length).toBe(2)
  expect(grown[1]?.admittedAtMs).toBe(NOW + 5)
})

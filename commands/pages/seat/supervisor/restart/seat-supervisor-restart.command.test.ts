import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Restarting,
  Seat,
} from "akasha/commands/pages/seat/supervisor/restart/seat-supervisor-restart.command.code.ts"
import {
  restartedEach,
  seatSupervisorRestart,
} from "akasha/commands/pages/seat/supervisor/restart/seat-supervisor-restart.command.code.ts"
import { holderIn, nameOf } from "akasha/seat-system/seat-reading/seat-reading.module.code.ts"

const SEATS: readonly Seat[] = [
  { page: "athena.seat.ts", name: "athena", holder: null },
  { page: "brigid.seat.ts", name: "brigid", holder: null },
]

const ASKED_ATHENA = "athena asked its supervisor and signalled it"

const ASKED_BRIGID = "brigid asked its supervisor and signalled it"

function restarting(upTo: number): Restarting {
  return (_root, seat, done) => {
    if (done.length >= upTo) throw new OperationalError(`${seat.name} would not take the ask`)
    done.push(`${seat.name} asked its supervisor and signalled it`)
    return undefined
  }
}

function given(root: string): Given {
  return {
    root,
    calledAs: "akasha seat supervisor restart",
    from: root,
    writer: null,
    agentId: null,
  }
}

test("a restart naming no reach is refused", async () => {
  const said = await seatSupervisorRestart([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--all")
})

test("a flag it does not take is refused", async () => {
  expect((await seatSupervisorRestart(["--some"], given("/nowhere"))).code).toBe(1)
})

test("a second word after the reach is refused", async () => {
  expect((await seatSupervisorRestart(["--all", "--all"], given("/nowhere"))).code).toBe(1)
})

test("each seat is named as soon as that seat has been asked and signalled", () => {
  const done: string[] = []

  restartedEach("/nowhere", SEATS, restarting(2), done)
  expect(done).toEqual([ASKED_ATHENA, ASKED_BRIGID])
})

test("a restart that threw part way names in its refusal each seat it had signalled", async () => {
  const held = await answering((done) => {
    restartedEach("/nowhere", SEATS, restarting(1), done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([ASKED_ATHENA])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("athena")
  expect(last).not.toContain("brigid asked")
})

test("a restart that threw before a seat was signalled names none", async () => {
  const held = await answering((done) => {
    restartedEach("/nowhere", SEATS, restarting(0), done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a name is read off the page path", () => {
  expect(nameOf("seat-system/seats/pages/athena.seat.ts")).toBe("athena")
})

test("a process is its pid and the start time joined by a hyphen", () => {
  expect(holderIn("3593837-58441972")).toEqual({ pid: 3593837, started: "58441972" })
})

test("a process stating no start time is no process", () => {
  expect(holderIn("3593837")).toBeNull()
  expect(holderIn("3593837--")).toBeNull()
  expect(holderIn("")).toBeNull()
  expect(holderIn(null)).toBeNull()
})

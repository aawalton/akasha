import { expect, test } from "bun:test"
import { AsyncLocalStorage } from "node:async_hooks"
import {
  type MayRead,
  readingAsTheSystem,
  readingFor,
  type WhoIsReading,
} from "akasha/alan/harness/modules/reading-in-flight/reading-in-flight.module.code.ts"
import { gateInScope } from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const ONE_STORE = Symbol.for("akasha.reading-in-flight.store")

function storeShared(): AsyncLocalStorage<unknown> {
  const held: unknown = Reflect.get(globalThis, ONE_STORE)
  if (!(held instanceof AsyncLocalStorage)) throw new Error("no store is shared")
  return held
}

const AT = new Request("https://alanwalton.com/api/nav-icon/0d4d87c8")

const readsEverything: MayRead = async () => ({ permitted: true, narrows: null })

const nobody: WhoIsReading = async () => ({ user: null })

async function reaching(pageTypeSlug: string): Promise<unknown> {
  const gate = gateInScope()
  if (gate === null) throw new Error("no reader rides with this read")
  return gate(pageTypeSlug)
}

test("a read outside any request names no reader", () => {
  expect(gateInScope()).toBeNull()
})

test("a read the system makes for itself reaches every page type", async () => {
  await readingAsTheSystem(async () => {
    expect(await reaching("readout")).toEqual({ permitted: true, narrows: null })
  })
})

test("a request serving a file costs no session reading", async () => {
  let asked = 0
  await readingFor(
    async () => {
      asked += 1
      return { user: null }
    },
    AT,
    async () => undefined,
    readsEverything
  )
  expect(asked).toBe(0)
})

test("one request reads its session once however many reads that request makes", async () => {
  let asked = 0
  await readingFor(
    async () => {
      asked += 1
      return { user: { contributor: "one" } }
    },
    AT,
    async () => {
      await reaching("readout")
      await reaching("nav")
    },
    readsEverything
  )
  expect(asked).toBe(1)
})

test("the reader a request names is the reader every read under it is weighed against", async () => {
  const weighed: (object | null)[] = []
  await readingFor(
    async () => ({ user: { contributor: "one" } }),
    AT,
    async () => {
      await reaching("readout")
    },
    async (user) => {
      weighed.push(user)
      return { permitted: true, narrows: null }
    }
  )
  expect(weighed).toEqual([{ contributor: "one" }])
})

test("the reader a request names rides in a store the whole runtime shares", async () => {
  const shared = storeShared()
  expect(shared.getStore()).toBeUndefined()
  await readingFor(
    nobody,
    AT,
    async () => {
      expect(shared.getStore()).not.toBeUndefined()
    },
    readsEverything
  )
})

test("a read outside the request that named a reader names no reader", async () => {
  await readingFor(nobody, AT, async () => undefined, readsEverything)
  expect(gateInScope()).toBeNull()
})

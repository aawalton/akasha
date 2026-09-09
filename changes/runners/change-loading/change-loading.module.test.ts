import { afterAll, expect, test } from "bun:test"
import { HELD_PAGE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { refusing, stating } from "../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../modules/answer/change-answer.module.types.ts"
import {
  addedTo,
  isLedger,
  ledgerAt,
  NOTHING_OVER,
  type World,
} from "../../modules/change-shadow/change-shadow.module.code.ts"
import type { Guard } from "../../modules/guarding/change-guarding.module.types.ts"
import { codeAt, partsOf, ranBy, sittingAt, targetRefusal } from "./change-loading.module.code.ts"

afterAll(scratch.sweep)

const AT = "akasha/one.held.ts"

const WAS = "akasha/one/one.held.code.ts"

const NOW = "akasha/one/one.held-anew.code.ts"

const WAS_PAGE = "akasha/one/held-one.held-kind.ts"

const NOW_PAGE = "akasha/one/held-one.held-other.ts"

const WROTE: Answer = stating([{ kind: "add", path: AT, content: "held\n" }])

function moving(was: string, now: string): Answer {
  return stating([{ kind: "move", pathFrom: was, pathTo: now }])
}

function worldOf(): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

test("a path a move carries a body to is loaded from the path that body came from", () => {
  const world = { ...worldOf(), over: moving(WAS, NOW) }

  expect(sittingAt(world, NOW)).toBe(WAS)
})

test("a path no move carries a body to is loaded from that path", () => {
  expect(sittingAt(worldOf(), AT)).toBe(AT)
})

test("a page a move carries elsewhere is read for its code beside the path that page came from", () => {
  const world = {
    ...worldOf(),
    index: { listedAt: () => [{ path: NOW_PAGE }] } as never,
    over: moving(WAS_PAGE, NOW_PAGE),
  }

  expect(codeAt(world, "held-kind/held-one")).toBe("akasha/one/held-one.held-kind.code.ts")
})

test("an address is parted at the first slash into a page type and a slug", () => {
  expect(partsOf("change-agent/remove-page")).toEqual(["change-agent", "remove-page"])
})

test("an address carrying a slash in its slug keeps that slash in the slug", () => {
  expect(partsOf("change/one/two")).toEqual(["change", "one/two"])
})

test("an address carrying no slash is no address", () => {
  expect(partsOf("remove-page")).toBeNull()
})

test("an address opening with a slash is no address", () => {
  expect(partsOf("/remove-page")).toBeNull()
})

test("an address closing with a slash is no address", () => {
  expect(partsOf("change/")).toBeNull()
})

test("a change loaded is run over the world handed in and answers its own edits", async () => {
  const said = await ranBy(worldOf(), { run: () => WROTE, guards: [] }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change whose run settles later is awaited before its guards run", async () => {
  const said = await ranBy(worldOf(), { run: () => Promise.resolve(WROTE), guards: [] }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change that refuses runs no guard", async () => {
  let ran = 0
  const said = await ranBy(
    worldOf(),
    {
      run: () => refusing("no"),
      guards: [
        () => {
          ran += 1
          return null
        },
      ],
    },
    {}
  )

  expect(said.refused).toBe("no")
  expect(ran).toBe(0)
})

const MOVED_PAGE = "akasha/six/held.module.ts"

test("a guard is handed the world the change read before that change answered", async () => {
  const root = indexedRepo()
  const carried = moving(HELD_PAGE, MOVED_PAGE)
  let read: unknown = null

  const said = await ranBy(
    ledgerAt(root, textIn(root)),
    {
      run: (world) => {
        if (isLedger(world)) addedTo(world, carried)
        return carried
      },
      guards: [
        (given) => {
          read = given.before.index.pageByPath(HELD_PAGE)
          return null
        },
      ],
    },
    {}
  )

  expect(said.refused).toBe(null)
  expect(read).not.toBeNull()
})

const SUBTYPES: Readonly<Record<string, string>> = {
  "file-code": "change-target-subtype/file",
  "file-page": "change-target-subtype/file-code",
  "file-page-type": "change-target-subtype/file-page",
}

const PAGE_TYPES = new Set(["held", "page-type"])

const UNDER = new Set(["text-property"])

const SUBTYPE = "change-target-subtype"

const PAGE_TYPE_AT = "akasha/kept.page-type.ts"

const PLAIN = "akasha/one/notes.md"

const ADDRESS = "change-mechanical/held-one"

function judging(acts: string | null): World {
  return {
    ...worldOf(),
    index: Object.assign({} as World["index"], {
      pageAt: (pageType: string, slug: string) => {
        if (pageType === SUBTYPE) {
          const held = SUBTYPES[slug]
          return held === undefined ? null : { parent: held }
        }
        return acts === null ? {} : { changeTargetSubtype: acts }
      },
      pageTypesIn: () => PAGE_TYPES,
      kindsUnder: () => UNDER,
    }),
  }
}

test("a path whose kind is the subtype the change acts on is run", () => {
  const world = judging("change-target-subtype/file-page")

  expect(targetRefusal(world, ADDRESS, { at: AT })).toBeNull()
})

test("a path whose kind narrows the subtype the change acts on is run", () => {
  const world = judging("change-target-subtype/file-code")

  expect(targetRefusal(world, ADDRESS, { at: AT })).toBeNull()
})

test("a path whose kind does not narrow that subtype is refused before the change runs", () => {
  const world = judging("change-target-subtype/file-page-type")

  expect(targetRefusal(world, ADDRESS, { at: AT })).toBe(
    `\`${AT}\` is a \`file-page\`, and \`${ADDRESS}\` acts on a \`file-page-type\``
  )
})

test("a path the change acts on is judged whatever the change would have done with it", () => {
  const world = judging("change-target-subtype/file-page")

  expect(targetRefusal(world, ADDRESS, { at: PAGE_TYPE_AT })).toBeNull()
})

test("the path a carry comes from is the path judged", () => {
  const world = judging("change-target-subtype/file-page")

  expect(targetRefusal(world, ADDRESS, { from: PLAIN, to: AT })).toBe(
    `\`${PLAIN}\` is a \`file\`, and \`${ADDRESS}\` acts on a \`file-page\``
  )
})

test("a change acting on no subtype has no path judged", () => {
  expect(targetRefusal(judging(null), ADDRESS, { at: PLAIN })).toBeNull()
})

test("a change acting on no file subtype has no path judged", () => {
  const world = judging("change-target-subtype/folder")

  expect(targetRefusal(world, ADDRESS, { at: PLAIN })).toBeNull()
})

test("the subtype a change judges a path against is worked out once over one world", () => {
  const world = judging("change-target-subtype/file-page")
  let asked = 0
  const over: World = {
    ...world,
    index: {
      ...world.index,
      pageAt: (pageType, slug) => {
        asked += 1
        return world.index.pageAt(pageType, slug)
      },
    },
  }

  expect(targetRefusal(over, ADDRESS, { at: AT })).toBeNull()
  asked = 0

  expect(targetRefusal(over, ADDRESS, { at: AT })).toBeNull()
  expect(asked).toBe(0)
})

test("a call handing in no path has no path judged", () => {
  const world = judging("change-target-subtype/file-page-type")

  expect(targetRefusal(world, ADDRESS, {})).toBeNull()
})

const FRESH = "akasha/one/fresh.module.code.ts"

const MENDED = "akasha/one/mended.module.code.ts"

function adding(path: string): Answer {
  return stating([{ kind: "add", path, content: "held\n" }])
}

test("a guard the change reached inside names runs at the outermost change", async () => {
  const root = indexedRepo()
  const world = ledgerAt(root, textIn(root))
  const ran: string[] = []
  const inside = {
    run: () => adding(FRESH),
    guards: [
      () => {
        ran.push("guard")
        return null
      },
    ],
  }

  const said = await ranBy(
    world,
    {
      run: async () => {
        const held = await ranBy(world, inside, {}, true)
        ran.push("inside answered")
        return held
      },
      guards: [],
    },
    {}
  )

  expect(said.refused).toBe(null)
  expect(ran).toEqual(["inside answered", "guard"])
})

test("a guard reached at two rungs of one composition runs once", async () => {
  const root = indexedRepo()
  const world = ledgerAt(root, textIn(root))
  let ran = 0
  const inside = {
    run: () => stating([]),
    guards: [
      () => {
        ran += 1
        return null
      },
    ],
  }

  const said = await ranBy(
    world,
    {
      run: async () => {
        await ranBy(world, inside, {}, true)
        await ranBy(world, inside, {}, true)
        return adding(FRESH)
      },
      guards: [],
    },
    {}
  )

  expect(said.refused).toBe(null)
  expect(ran).toBe(1)
})

const HALFWAY = `\`${FRESH}\` landed and \`${MENDED}\` did not`

test("a rung a guard would refuse alone is let through where the whole answer is mended", async () => {
  const root = indexedRepo()
  const mending: Guard = (given) =>
    given.said.edits.some((one) => one.kind === "add" && one.path === MENDED) ? null : HALFWAY
  const inside = { run: () => adding(FRESH), guards: [mending] }
  const world = ledgerAt(root, textIn(root))

  const said = await ranBy(
    world,
    {
      run: async () => {
        const held = await ranBy(world, inside, {}, true)
        return stating([...held.edits, { kind: "add", path: MENDED, content: "held\n" }])
      },
      guards: [],
    },
    {}
  )

  expect(said.refused).toBe(null)
  expect((await ranBy(ledgerAt(root, textIn(root)), inside, {})).refused).toBe(HALFWAY)
})

test("the arguments reach the change as the caller handed the arguments in", async () => {
  let held: unknown = null
  await ranBy(
    worldOf(),
    {
      run: (_world, given) => {
        held = given
        return WROTE
      },
      guards: [],
    },
    { at: AT, body: "one\ntwo\n" }
  )

  expect(held).toEqual({ at: AT, body: "one\ntwo\n" })
})

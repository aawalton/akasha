import { afterAll, expect, test } from "bun:test"
import { changeAgent } from "akasha/change/agent/change-agent.page-type.ts"
import { removePage } from "akasha/change/agent/file/remove-page/remove-page.change-agent.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import {
  type Answer,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  ledgerAt,
  NOTHING_OVER,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  codeAt,
  helpAsked,
  helpOfChange,
  loadedAt,
  partsOf,
  ranBy,
  sittingAt,
  takesSaid,
  targetRefusal,
} from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import { changeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.ts"
import { file } from "akasha/change/target/subtype/pages/file.change-target-subtype.ts"
import { fileCode } from "akasha/change/target/subtype/pages/file-code.change-target-subtype.ts"
import { filePage } from "akasha/change/target/subtype/pages/file-page.change-target-subtype.ts"
import { filePageType } from "akasha/change/target/subtype/pages/file-page-type.change-target-subtype.ts"
import { folder } from "akasha/change/target/subtype/pages/folder.change-target-subtype.ts"
import {
  indexedRepo,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const AT = "akasha/one.held.ts"

const WAS = "akasha/one/one.held.code.ts"

const NOW = "akasha/one/one.held-anew.code.ts"

const WAS_PAGE = "akasha/one/held-one.held-kind.ts"

const NOW_PAGE = "akasha/one/held-one.held-other.ts"

const REMOVE_PAGE_AT = `${changeAgent.slug}/${removePage.slug}` as const

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
  expect(partsOf(REMOVE_PAGE_AT)).toEqual([changeAgent.slug, removePage.slug])
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
  const said = await ranBy(worldOf(), { run: () => WROTE }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change whose run settles later is awaited before its answer is given", async () => {
  const said = await ranBy(worldOf(), { run: () => Promise.resolve(WROTE) }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change that refuses answers that refusal", async () => {
  const said = await ranBy(worldOf(), { run: () => refusing("no") }, {})

  expect(said.refused).toBe("no")
})

const SUBTYPE = changeTargetSubtype.slug

const FILE_AT = `${SUBTYPE}/${file.slug}` as const

const FILE_CODE_AT = `${SUBTYPE}/${fileCode.slug}` as const

const FILE_PAGE_AT = `${SUBTYPE}/${filePage.slug}` as const

const FILE_PAGE_TYPE_AT = `${SUBTYPE}/${filePageType.slug}` as const

const FOLDER_AT = `${SUBTYPE}/${folder.slug}` as const

const SUBTYPES: Readonly<Record<string, string>> = {
  "file-code": FILE_AT,
  "file-page": FILE_CODE_AT,
  "file-page-type": FILE_PAGE_AT,
}

const PAGE_TYPES = new Set(["held", "page-type"])

const UNDER = new Set(["text-property"])

const PAGE_TYPE_AT = "akasha/kept.page-type.ts"

const PLAIN = "akasha/one/notes.md"

const ADDRESS = `${changeMechanical.slug}/held-one` as const

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
  const world = judging(FILE_PAGE_AT)

  expect(targetRefusal(world, ADDRESS, { at: AT })).toBeNull()
})

test("a path whose kind narrows the subtype the change acts on is run", () => {
  const world = judging(FILE_CODE_AT)

  expect(targetRefusal(world, ADDRESS, { at: AT })).toBeNull()
})

test("a path whose kind does not narrow that subtype is refused before the change runs", () => {
  const world = judging(FILE_PAGE_TYPE_AT)

  expect(targetRefusal(world, ADDRESS, { at: AT })).toBe(
    `\`${AT}\` is a \`file-page\`, and \`${ADDRESS}\` acts on a \`file-page-type\``
  )
})

test("a path the change acts on is judged whatever the change would have done with it", () => {
  const world = judging(FILE_PAGE_AT)

  expect(targetRefusal(world, ADDRESS, { at: PAGE_TYPE_AT })).toBeNull()
})

test("the path a carry comes from is the path judged", () => {
  const world = judging(FILE_PAGE_AT)

  expect(targetRefusal(world, ADDRESS, { from: PLAIN, to: AT })).toBe(
    `\`${PLAIN}\` is a \`file\`, and \`${ADDRESS}\` acts on a \`file-page\``
  )
})

test("a change acting on no subtype has no path judged", () => {
  expect(targetRefusal(judging(null), ADDRESS, { at: PLAIN })).toBeNull()
})

test("a change acting on no file subtype has no path judged", () => {
  const world = judging(FOLDER_AT)

  expect(targetRefusal(world, ADDRESS, { at: PLAIN })).toBeNull()
})

test("a change acting on a file of any kind runs a path of every kind", () => {
  const world = judging(FILE_AT)

  expect(targetRefusal(world, ADDRESS, { at: PLAIN })).toBeNull()
  expect(targetRefusal(world, ADDRESS, { at: AT })).toBeNull()
  expect(targetRefusal(world, ADDRESS, { at: PAGE_TYPE_AT })).toBeNull()
})

test("a change acting on a file of any kind asks the index for no path's kind", () => {
  const world = judging(FILE_AT)
  let asked = 0
  const over: World = {
    ...world,
    index: {
      ...world.index,
      pageTypesIn: () => {
        asked += 1
        return PAGE_TYPES
      },
    },
  }

  expect(targetRefusal(over, ADDRESS, { at: PLAIN })).toBeNull()
  expect(targetRefusal(over, ADDRESS, { at: AT })).toBeNull()
  expect(asked).toBe(0)
})

test("the subtype a change judges a path against is worked out once over one world", () => {
  const world = judging(FILE_PAGE_AT)
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

test("an address naming no page is refused for that rather than for exporting no run", async () => {
  const world = { ...worldOf(), index: { listedAt: () => [] } as never }

  expect(await loadedAt(world, ADDRESS)).toBe(
    `\`${ADDRESS}\` names no page here, so no code is there to load`
  )
})

const HERE = "change-loading.module.ts"

test("an address whose code exports no run is refused for the export", async () => {
  const world = {
    ...worldOf(),
    root: import.meta.dir,
    index: { listedAt: () => [{ path: HERE }] } as never,
  }

  expect(await loadedAt(world, ADDRESS)).toBe(
    `\`${ADDRESS}\` reaches no change exporting \`runChange\``
  )
})

test("a call handing in no path has no path judged", () => {
  const world = judging(FILE_PAGE_TYPE_AT)

  expect(targetRefusal(world, ADDRESS, {})).toBeNull()
})

const FRESH = "akasha/one/fresh.module.code.ts"

function adding(path: string): Answer {
  return stating([{ kind: "add", path, content: "held\n" }])
}

test("both spellings of the help flag are told apart from an argument", () => {
  expect(helpAsked("--help\n")).toBe(true)
  expect(helpAsked("  -h  ")).toBe(true)
  expect(helpAsked("at: a/b.ts\n")).toBe(false)
  expect(helpAsked("")).toBe(false)
})

test("the arguments a change takes are said from that change's own list", () => {
  expect(takesSaid("remove-page", ["at", "to"])).toBe(" — `remove-page` takes `at`, `to`")
  expect(takesSaid("remove-page", [])).toBe("")
  expect(takesSaid("remove-page", undefined)).toBe("")
})

test("a help answer opens with the call and the change's own definition", () => {
  expect(helpOfChange("akasha change apply", "remove-page", "one page taken away", ["at"])).toEqual(
    [
      "akasha change apply remove-page",
      "",
      "one page taken away",
      "",
      "It takes these arguments, piped in:",
      "",
      "  at",
    ]
  )
})

test("a change stating no definition is answered with the call alone", () => {
  expect(helpOfChange("akasha change apply", "held", null, [])).toEqual([
    "akasha change apply held",
    "",
    "It takes no argument.",
  ])
})

test("a key the change does not take is refused before that change runs", async () => {
  let ran = 0
  const said = await ranBy(
    worldOf(),
    {
      run: () => {
        ran += 1
        return WROTE
      },
      takes: ["at", "old", "new"],
    },
    { at: AT, pat: "one" }
  )

  expect(ran).toBe(0)
  expect(said.refused).toBe(
    "`pat` is no argument this change takes — it takes `at`, `old`, `new`. Did you mean `at`?"
  )
})

test("a key near no argument the change takes is refused with nothing pointed at", async () => {
  const said = await ranBy(worldOf(), { run: () => WROTE, takes: ["at"] }, { wherever: "one" })

  expect(said.refused).toBe("`wherever` is no argument this change takes — it takes `at`.")
})

test("a change stating no arguments it takes has no key judged", async () => {
  const said = await ranBy(worldOf(), { run: () => WROTE }, { at: AT, pat: "one" })

  expect(said).toEqual(WROTE)
})

test("a change reached by another change has no key judged", async () => {
  const root = indexedRepo()
  const world = ledgerAt(root, textIn(root))

  const said = await ranBy(world, { run: () => adding(FRESH), takes: [] }, {}, true)

  expect(said.refused).toBeNull()
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
    },
    { at: AT, body: "one\ntwo\n" }
  )

  expect(held).toEqual({ at: AT, body: "one\ntwo\n" })
})

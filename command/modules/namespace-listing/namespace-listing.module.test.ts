import { afterAll, expect, test } from "bun:test"
import { command } from "akasha/command/command.page-type.ts"
import { calling } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  ANSWERS,
  COMMAND,
  namespacesIn,
  OUTSIDE,
  rootWith,
  sweep,
} from "akasha/command/modules/calling/calling.module.test-fixtures.ts"
import {
  type Held,
  listingOf,
  partsOf,
  slugOfPart,
} from "akasha/command/modules/namespace-listing/namespace-listing.module.code.ts"
import { namespace } from "akasha/command/namespace/namespace.page-type.ts"
import { trackSessionOpen } from "akasha/command/pages/track/session/open/track-session-open.command.ts"
import { trackSession } from "akasha/command/pages/track/session/track-session.namespace.ts"
import { track } from "akasha/command/pages/track/track.namespace.ts"

afterAll(sweep)

const HELP = "--help"

const TRACK_AT = `${namespace.slug}/${track.slug}` as const

const TRACK_SESSION_AT = `${namespace.slug}/${trackSession.slug}` as const

const TRACK_SESSION_OPEN_AT = `${command.slug}/${trackSessionOpen.slug}` as const

test("the parts a page names are read off it, and anything else is not", () => {
  expect(partsOf({ parts: ["command/a", "namespace/b"] })).toEqual(["command/a", "namespace/b"])
  expect(partsOf({ parts: ["command/a", 1, null] })).toEqual(["command/a"])
  expect(partsOf({ parts: "command/a" })).toEqual([])
  expect(partsOf({})).toEqual([])
  expect(partsOf(null)).toEqual([])
})

test("the page type a part names is dropped", () => {
  expect(slugOfPart(TRACK_SESSION_OPEN_AT)).toBe("track-session-open")
  expect(slugOfPart("track-session-open")).toBe("track-session-open")
})

const HELD: readonly Held[] = [
  { named: "akasha track session open", said: "open one" },
  { named: "akasha track session log", said: null },
]

test("the parts are written down under the namespace, padded so the definitions line up", () => {
  const said = listingOf("akasha track session", "the stretches", HELD, HELP)
  expect(said?.[0]).toBe("akasha track session — the stretches")
  expect(said?.[1]).toBe("")
  expect(said?.[2]).toBe("  akasha track session log")
  expect(said?.[3]).toBe("  akasha track session open  open one")
  expect(said?.[5]).toBe("say `akasha track session <command> --help` for what one takes")
})

test("the parts are sorted by the name each is listed under", () => {
  const held: readonly Held[] = [
    { named: "akasha seat", said: null },
    { named: "akasha audit", said: null },
    { named: "akasha read", said: null },
  ]
  const said = listingOf("akasha", null, held, HELP)
  expect(said?.slice(2, 5)).toEqual(["  akasha audit", "  akasha read", "  akasha seat"])
})

test("a namespace stating no definition is written down by name alone", () => {
  expect(listingOf("akasha track session", null, HELD, HELP)?.[0]).toBe("akasha track session")
})

test("a namespace holding no part is written down as nothing", () => {
  expect(listingOf("akasha track session", "the stretches", [], HELP)).toBe(null)
})

test("a namespace naming no command is answered with what sits under it", async () => {
  const root = rootWith(
    [{ slug: "track-session-open", name: "open", body: ANSWERS, definition: "open one" }],
    COMMAND,
    [TRACK_AT]
  )
  namespacesIn(root, [
    { slug: "track", name: "track", definition: "a day", parts: [TRACK_SESSION_AT] },
    {
      slug: "track-session",
      name: "session",
      definition: "the stretches a day holds",
      parts: [TRACK_SESSION_OPEN_AT],
    },
  ])
  const said = await calling(["track", "session"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha track session — the stretches a day holds")
  expect(said.report).toContain("  akasha track session open  open one")
})

test("a namespace under a namespace is listed as one word more", async () => {
  const root = rootWith([{ slug: "track-session-open", body: ANSWERS }], COMMAND, [TRACK_AT])
  namespacesIn(root, [
    { slug: "track", name: "track", definition: "a day", parts: [TRACK_SESSION_AT] },
    {
      slug: "track-session",
      name: "session",
      definition: "the stretches",
      parts: [TRACK_SESSION_OPEN_AT],
    },
  ])
  const said = await calling(["track"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report).toContain("  akasha track session  the stretches")
})

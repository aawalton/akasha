import { expect, test } from "bun:test"
import {
  moduleReasonIn,
  PAGES_AT,
  placeReasonIn,
  reasonIn,
} from "akasha/checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.code-check.decision.code.ts"

const ROOT = { folder: PAGES_AT, slug: null }

const READ = { folder: "commands/pages/read", beside: true }

const CALENDAR = { folder: "commands/pages/google/calendar", slug: "google-calendar" }

const GOOGLE = { folder: "commands/pages/google", slug: "google" }

const GIT = { folder: "commands/pages/git", slug: "git" }

test("a page the command page type names sits in a folder directly in the pages folder", () => {
  expect(reasonIn("commands/pages/humming/humming.command.ts", "humming", ROOT)).toBe(null)
})

test("a page the page type names from inside another folder is refused", () => {
  const said = reasonIn("commands/pages/git/humming/humming.command.ts", "humming", ROOT)

  expect(said).toContain("commands/pages/humming")
})

test("a page sits directly inside the folder of the page above it", () => {
  const at = "commands/pages/google/calendar/matching/google-calendar-matching.namespace.ts"

  expect(reasonIn(at, "google-calendar-matching", CALENDAR)).toBe(null)
})

test("a folder named for the whole slug rather than what the slug adds is refused", () => {
  const at =
    "commands/pages/google/calendar/google-calendar-matching/google-calendar-matching.namespace.ts"
  const said = reasonIn(at, "google-calendar-matching", CALENDAR)

  expect(said).toContain("commands/pages/google/calendar/matching")
})

test("a slug opening with anything but the slug above it is refused for the slug", () => {
  const said = reasonIn("commands/pages/google/drive/drive.namespace.ts", "drive", GOOGLE)

  expect(said).toContain("`drive`")
  expect(said).toContain("hyphen")
})

test("a page sitting beside the page above it rather than under it is refused", () => {
  const said = reasonIn("commands/pages/git/git-push.command.ts", "git-push", GIT)

  expect(said).toContain("commands/pages/git/push")
})

test("a page one folder too deep under the page above it is refused", () => {
  const said = reasonIn("commands/pages/git/push/again/git-push.command.ts", "git-push", GIT)

  expect(said).toContain("commands/pages/git/push")
})

test("a name carrying the name of the folder above it is refused", () => {
  const said = reasonIn("commands/pages/git/git-push/git-git-push.command.ts", "git-git-push", GIT)

  expect(said).toContain("`git-push`")
  expect(said).toContain("`git`")
})

test("a name carrying a word from a folder two levels above it is refused", () => {
  const at = "commands/pages/google/calendar/event-google/google-calendar-event-google.command.ts"
  const said = reasonIn(at, "google-calendar-event-google", CALENDAR)

  expect(said).toContain("`google`")
})

test("a name sharing no word with any folder above it is let through", () => {
  const at = "commands/pages/google/calendar/humming/google-calendar-humming.namespace.ts"

  expect(reasonIn(at, "google-calendar-humming", CALENDAR)).toBe(null)
})

test("a module in a folder directly inside the folder of the command naming it is let through", () => {
  expect(moduleReasonIn("commands/pages/read/humming/humming.module.ts", READ)).toBe(null)
})

test("a module beside the command naming it rather than under it is refused", () => {
  const said = moduleReasonIn("commands/pages/read/humming.module.ts", READ)

  expect(said).toContain("commands/pages/read")
})

test("a module one folder too deep under the command naming it is refused", () => {
  const said = moduleReasonIn("commands/pages/read/warbling/humming/humming.module.ts", READ)

  expect(said).toContain("commands/pages/read/warbling/humming")
})

test("a module under a page that is no command and no namespace is refused", () => {
  const at = "commands/pages/read/humming/humming.module.ts"
  const said = moduleReasonIn(at, { folder: "commands/pages/read", beside: false })

  expect(said).toContain("named by the command or the namespace beside it")
})

test("a module the command page type names is let through wherever it sits under commands", () => {
  const said = moduleReasonIn("commands/modules/humming/humming.module.ts", {
    folder: "commands",
    beside: false,
  })

  expect(said).toBe(null)
})

test("a module under commands named by a page outside commands is refused", () => {
  const at = "commands/modules/humming/humming.module.ts"
  const said = moduleReasonIn(at, { folder: "warbling", beside: false })

  expect(said).toContain("`warbling`")
})

test("a module whose name carries a word of a folder above it is let through", () => {
  const at = "commands/pages/google/calendar/calendar-humming/calendar-humming.module.ts"
  const said = moduleReasonIn(at, { folder: "commands/pages/google/calendar", beside: true })

  expect(said).toBe(null)
})

const LEVELS = new Set<string>([
  "commands/pages/read",
  "commands/pages/google",
  "commands/pages/google/calendar",
  "commands/pages/google/calendar/event",
  "commands/pages/google/calendar/match",
  "commands/pages/google/drive",
])

test("a module one command reaches sits under that command", () => {
  const at = "commands/pages/google/calendar/event/humming/humming.module.ts"
  const reaching = ["commands/pages/google/calendar/event"]

  expect(placeReasonIn(at, { levels: LEVELS, reaching })).toBe(null)
})

test("a module one command reaches from lower down is refused with that command named", () => {
  const at = "commands/pages/google/calendar/humming/humming.module.ts"
  const reaching = ["commands/pages/google/calendar/event"]
  const said = placeReasonIn(at, { levels: LEVELS, reaching })

  expect(said).toContain("commands/pages/google/calendar/event")
})

test("a module two commands under one namespace reach sits under that namespace", () => {
  const at = "commands/pages/google/calendar/humming/humming.module.ts"
  const reaching = ["commands/pages/google/calendar/event", "commands/pages/google/calendar/match"]

  expect(placeReasonIn(at, { levels: LEVELS, reaching })).toBe(null)
})

test("a module two commands under one namespace reach is refused under one of them", () => {
  const at = "commands/pages/google/calendar/event/humming/humming.module.ts"
  const reaching = ["commands/pages/google/calendar/event", "commands/pages/google/calendar/match"]
  const said = placeReasonIn(at, { levels: LEVELS, reaching })

  expect(said).toContain("commands/pages/google/calendar")
})

test("a module reached from a module counts that module's level", () => {
  const at = "commands/pages/google/calendar/humming/humming.module.ts"
  const reaching = ["commands/pages/google/calendar/event/warbling"]

  expect(placeReasonIn(at, { levels: LEVELS, reaching })).toContain(
    "commands/pages/google/calendar/event"
  )
})

test("a module two commands under different namespaces reach belongs in the modules folder", () => {
  const at = "commands/pages/read/humming/humming.module.ts"
  const reaching = ["commands/pages/read", "commands/pages/google/drive"]
  const said = placeReasonIn(at, { levels: LEVELS, reaching })

  expect(said).toContain("commands/modules")
})

test("a module no page under the pages folder reaches belongs in the modules folder", () => {
  const at = "commands/pages/read/humming/humming.module.ts"
  const said = placeReasonIn(at, { levels: LEVELS, reaching: [] })

  expect(said).toContain("commands/modules")
})

test("a module already in the modules folder is judged by nothing here", () => {
  const at = "commands/modules/humming/humming.module.ts"

  expect(placeReasonIn(at, { levels: LEVELS, reaching: [] })).toBe(null)
})

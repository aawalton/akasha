import { expect, test } from "bun:test"
import { PAGES_AT, reasonIn } from "./command-is-in-the-right-folder.code-check.decision.code.ts"

const ROOT = { folder: PAGES_AT, slug: null }

const CALENDAR = { folder: "commands/pages/google/calendar", slug: "google-calendar" }

const GOOGLE = { folder: "commands/pages/google", slug: "google" }

const GIT = { folder: "commands/pages/git", slug: "git" }

test("a page the command page type names sits in a folder directly in the pages folder", () => {
  expect(reasonIn("commands/pages/audit/audit.command.ts", "audit", ROOT)).toBe(null)
})

test("a page the page type names from inside another folder is refused", () => {
  const said = reasonIn("commands/pages/git/audit/audit.command.ts", "audit", ROOT)

  expect(said).toContain("commands/pages/audit")
})

test("a page sits directly inside the folder of the page above it", () => {
  const at = "commands/pages/google/calendar/events/google-calendar-events.namespace.ts"

  expect(reasonIn(at, "google-calendar-events", CALENDAR)).toBe(null)
})

test("a folder named for the whole slug rather than what the slug adds is refused", () => {
  const at =
    "commands/pages/google/calendar/google-calendar-events/google-calendar-events.namespace.ts"
  const said = reasonIn(at, "google-calendar-events", CALENDAR)

  expect(said).toContain("commands/pages/google/calendar/events")
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

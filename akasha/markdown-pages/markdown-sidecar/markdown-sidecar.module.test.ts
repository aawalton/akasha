import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { besideAt, uncommittedAt } from "@akasha/pages-system/page-file-name"
import {
  pagesOfSidecar,
  sidecarCarriedTo,
  sidecarsOf,
} from "../markdown-sidecar/markdown-sidecar.module.code.ts"

const MARKDOWN_DAY = "pages/daily-tracking/2026-03-05.daily-tracking.md"

const AKASHA_DAY =
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.ts"

const AKASHA_SEAT = "akasha/seat-system/seats/pages/alan.seat.ts"

const root = mkdtempSync(join(tmpdir(), "sidecar-"))

function standing(relPaths: readonly string[]): void {
  for (const relPath of relPaths) {
    mkdirSync(join(root, relPath, ".."), { recursive: true })
    writeFileSync(join(root, relPath), "", "utf8")
  }
}

standing([
  MARKDOWN_DAY,
  "pages/daily-tracking/2026-03-05.daily-tracking.sessions.jsonl",
  "pages/daily-tracking/2026-03-05.daily-tracking.uncommitted.yaml",
  "pages/daily-tracking/2026-03-06.daily-tracking.md",
  "pages/daily-tracking/2026-03-06.daily-tracking.sessions.jsonl",
  AKASHA_DAY,
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl",
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.notes.attachment.md",
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-06/day-2026-03-06.daily-tracking.ts",
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-06/day-2026-03-06.daily-tracking.sessions.jsonl",
  AKASHA_SEAT,
  "akasha/seat-system/seats/pages/alan.seat.uncommitted.ts",
  "akasha/seat-system/seats/pages/alan.seat.sops.yaml",
  "akasha/seat-system/seats/pages/seat.page-type.ts",
])

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

describe("the files standing beside a page", () => {
  test("a markdown page's files are found, as they always were", () => {
    expect(sidecarsOf(root, MARKDOWN_DAY)).toEqual([
      "pages/daily-tracking/2026-03-05.daily-tracking.sessions.jsonl",
      "pages/daily-tracking/2026-03-05.daily-tracking.uncommitted.yaml",
    ])
  })

  /**
   * This is the repair. `sidecarsOf` asked whether the path ended `.md` and answered `[]` where it
   * did not, so `ops rm` and `ops mv` carried nothing beside any akasha page — against `rm`'s own
   * help, which promises a page's rows, attachment, uncommitted file and sops file go with it.
   */
  test("an akasha page's files are found rather than answered as none", () => {
    expect(sidecarsOf(root, AKASHA_DAY)).toEqual([
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.notes.attachment.md",
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl",
    ])
  })

  test("the uncommitted file and the sops file of an akasha page go with it", () => {
    expect(sidecarsOf(root, AKASHA_SEAT)).toEqual([
      "akasha/seat-system/seats/pages/alan.seat.sops.yaml",
      "akasha/seat-system/seats/pages/alan.seat.uncommitted.ts",
    ])
  })

  test("the uncommitted file is the one akasha itself names", () => {
    expect(pagesOfSidecar(uncommittedAt(AKASHA_SEAT) as string)).toEqual([AKASHA_SEAT])
  })

  test("a rows file is the one akasha itself names", () => {
    expect(pagesOfSidecar(besideAt(AKASHA_DAY, "sessions", "jsonl") as string)).toContain(
      AKASHA_DAY
    )
  })

  test("a page carries no neighbouring page's files", () => {
    for (const one of sidecarsOf(root, AKASHA_DAY)) expect(one).toContain("day-2026-03-05")
    for (const one of sidecarsOf(root, MARKDOWN_DAY)) expect(one).toContain("2026-03-05")
  })

  test("a plain module beside a page is no file of it", () => {
    expect(sidecarsOf(root, "akasha/seat-system/seats/pages/seat.page-type.ts")).toEqual([])
  })

  test("a path naming no page of either kind holds nothing beside it", () => {
    expect(sidecarsOf(root, "pages/daily-tracking")).toEqual([])
    expect(sidecarsOf(root, "README")).toEqual([])
  })

  test("a yaml uncommitted file belongs to the markdown page alone", () => {
    expect(
      pagesOfSidecar("pages/daily-tracking/2026-03-05.daily-tracking.uncommitted.yaml")
    ).toEqual([MARKDOWN_DAY])
  })

  test("a sops file names a page of either kind, both naming it the same way", () => {
    expect(pagesOfSidecar("akasha/seat-system/seats/pages/alan.seat.sops.yaml")).toEqual([
      "akasha/seat-system/seats/pages/alan.seat.md",
      AKASHA_SEAT,
    ])
  })
})

describe("where a file beside a page lands when the page moves", () => {
  test("a markdown page carries its files, as it always did", () => {
    expect(
      sidecarCarriedTo(
        "pages/daily-tracking/2026-03-05.daily-tracking.sessions.jsonl",
        MARKDOWN_DAY,
        "pages/daily-tracking/2026-03-06.daily-tracking.md"
      )
    ).toBe("pages/daily-tracking/2026-03-06.daily-tracking.sessions.jsonl")
  })

  /**
   * Taking a fixed `.md` off both ends sliced the wrong number of characters off an akasha page's
   * name, and answered `day-2026-03-06.daily-trackingssions.jsonl` — a name nothing downstream
   * would have caught, because a move never reads what it carries.
   */
  test("an akasha page carries its files under a whole name rather than a sliced one", () => {
    const at = sidecarCarriedTo(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl",
      AKASHA_DAY,
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-06/day-2026-03-06.daily-tracking.ts"
    )
    expect(at).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-06/day-2026-03-06.daily-tracking.sessions.jsonl"
    )
    expect(at).not.toContain(".ts.")
  })

  test("a page moving from markdown to akasha carries its rows across", () => {
    expect(
      sidecarCarriedTo(
        "pages/daily-tracking/2026-03-05.daily-tracking.sessions.jsonl",
        MARKDOWN_DAY,
        AKASHA_DAY
      )
    ).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl"
    )
  })

  test("a path naming no page is refused rather than answered wrongly", () => {
    expect(() => sidecarCarriedTo("pages/x.sessions.jsonl", "pages/x", "pages/y.md")).toThrow()
    expect(() => sidecarCarriedTo("pages/x.sessions.jsonl", "pages/x.md", "pages/y")).toThrow()
  })
})

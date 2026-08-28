import { afterAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pageOfSidecar, sidecarCarriedTo, sidecarsBeside, sidecarsOf } from "./sidecar.ts"

describe("pageOfSidecar", () => {
  test("names the page each kind of sidecar stands beside", () => {
    expect(pageOfSidecar("pages/persona/astra.portrait.attachment.txt")).toBe("pages/persona/astra.md")
    expect(pageOfSidecar("pages/temper-debuff-major/major-breach.effects.jsonl")).toBe(
      "pages/temper-debuff-major/major-breach.md"
    )
    expect(pageOfSidecar("pages/persona/astra.uncommitted.yaml")).toBe("pages/persona/astra.md")
    expect(pageOfSidecar("pages/claude-account/aawalton.claude-account.sops.yaml")).toBe("pages/claude-account/aawalton.claude-account.md")
  })

  test("gives a rows part the same page as the rows file it continues", () => {
    expect(pageOfSidecar("pages/seat/astra.turns.jsonl")).toBe("pages/seat/astra.md")
    expect(pageOfSidecar("pages/seat/astra.turns.part7.jsonl")).toBe("pages/seat/astra.md")
  })

  test("gives a sidecar to the longest page name it could stand beside", () => {
    expect(pageOfSidecar("pages/a.b.cover.attachment.png")).toBe("pages/a.b.md")
  })

  test("names no page for a page or for anything else", () => {
    expect(pageOfSidecar("pages/persona/astra.persona.md")).toBe(null)
    expect(pageOfSidecar("page/sidecar/sidecar.ts")).toBe(null)
    expect(pageOfSidecar("bun.lock")).toBe(null)
  })
})

const root = mkdtempSync("/var/tmp/astra-sidecars-")

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

describe("sidecarsOf", () => {
  for (const name of [
    "one.md",
    "one.portrait.attachment.txt",
    "one.rows.jsonl",
    "one.rows.part2.jsonl",
    "one.uncommitted.yaml",
    "one.sops.yaml",
    "one.two.md",
    "one.two.portrait.attachment.txt",
    "oneness.md",
    "oneness.portrait.attachment.txt",
  ]) {
    writeFileSync(join(root, name), "")
  }

  test("finds every file standing beside the page and nothing else", () => {
    expect(sidecarsOf(root, "one.md")).toEqual([
      "one.portrait.attachment.txt",
      "one.rows.jsonl",
      "one.rows.part2.jsonl",
      "one.sops.yaml",
      "one.uncommitted.yaml",
    ])
  })

  test("leaves a neighbouring page's files to that page", () => {
    expect(sidecarsOf(root, "one.two.md")).toEqual(["one.two.portrait.attachment.txt"])
    expect(sidecarsOf(root, "oneness.md")).toEqual(["oneness.portrait.attachment.txt"])
  })

  test("finds nothing for a path that is not a page or a directory that is not there", () => {
    expect(sidecarsOf(root, "one.rows.jsonl")).toEqual([])
    expect(sidecarsOf(root, "nowhere/one.md")).toEqual([])
  })
})

describe("sidecarCarriedTo", () => {
  test("carries the sidecar to the same name beside the page's destination", () => {
    expect(
      sidecarCarriedTo(
        "pages/persona/astra.portrait.attachment.txt",
        "pages/persona/astra.md",
        "pages/persona/astra.persona.md"
      )
    ).toBe("pages/persona/astra.persona.portrait.attachment.txt")
  })

  test("takes the suffix from the sidecar's own name, not from how long the source path is", () => {
    expect(sidecarCarriedTo("a/one.rows.jsonl", "much-longer-directory/one.md", "b/one.md")).toBe(
      "b/one.rows.jsonl"
    )
  })

  test("carries it across a rename of the page's own stem", () => {
    expect(sidecarCarriedTo("a/one.rows.part2.jsonl", "a/one.md", "b/two.md")).toBe("b/two.rows.part2.jsonl")
  })
})

describe("sidecarsBeside", () => {
  test("takes every page's files over the whole set, in one sorted list", () => {
    expect(sidecarsBeside(root, ["one.md", "one.two.md"])).toEqual([
      "one.portrait.attachment.txt",
      "one.rows.jsonl",
      "one.rows.part2.jsonl",
      "one.sops.yaml",
      "one.two.portrait.attachment.txt",
      "one.uncommitted.yaml",
    ])
  })

  test("leaves out a sidecar the set already names, so nothing is taken twice", () => {
    expect(sidecarsBeside(root, ["one.md", "one.rows.jsonl"])).toEqual([
      "one.portrait.attachment.txt",
      "one.rows.part2.jsonl",
      "one.sops.yaml",
      "one.uncommitted.yaml",
    ])
  })

  test("finds nothing beside a set of paths that are not pages", () => {
    expect(sidecarsBeside(root, ["one.sops.yaml", "nowhere/one.md"])).toEqual([])
  })
})

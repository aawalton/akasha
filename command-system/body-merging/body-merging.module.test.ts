import { expect, test } from "bun:test"
import { CLASH_MARK, clashing, type Merged, mergedOnto } from "./body-merging.module.code.ts"

const held = new TextEncoder()

function bodyOf(text: string): Uint8Array {
  return held.encode(text)
}

function textOf(merged: { readonly body: Uint8Array | null } | { readonly why: string }): string {
  if ("why" in merged) throw new Error(`merged answered a refusal — ${merged.why}`)
  if (merged.body === null) throw new Error("merged answered nothing where a body was wanted")
  return new TextDecoder().decode(merged.body)
}

function whyIn(merged: Merged): string {
  if (!("why" in merged)) throw new Error("merged answered a body where a refusal was wanted")
  return merged.why
}

function markedIn(merged: Merged): string {
  if (!("why" in merged) || merged.marked === undefined) {
    throw new Error("merged answered no marked body")
  }
  return new TextDecoder().decode(merged.marked)
}

const WORKSPACES = ["alpha", "game-characters-stats", "game-crafting", "game-items-addon", "zulu"]

function listOf(names: readonly string[]): string {
  return `{\n  "workspaces": [\n${names.map((one) => `    "${one}"`).join(",\n")}\n  ]\n}\n`
}

test("a body nothing moved under lands whole", () => {
  const base = bodyOf("one\ntwo\n")
  const mine = bodyOf("one\ntwo\nthree\n")
  expect(textOf(mergedOnto(base, mine, base))).toBe("one\ntwo\nthree\n")
})

test("a body already holding what the change would leave lands whole", () => {
  const base = bodyOf("one\n")
  const mine = bodyOf("one\ntwo\n")
  expect(textOf(mergedOnto(base, mine, mine))).toBe("one\ntwo\n")
})

test("two changes touching different lines are merged rather than refused", () => {
  const base = bodyOf("one\ntwo\nthree\nfour\nfive\n")
  const mine = bodyOf("ONE\ntwo\nthree\nfour\nfive\n")
  const theirs = bodyOf("one\ntwo\nthree\nfour\nFIVE\n")
  expect(textOf(mergedOnto(base, mine, theirs))).toBe("ONE\ntwo\nthree\nfour\nFIVE\n")
})

test("two removals from one list are merged, so neither row comes back", () => {
  const base = bodyOf(listOf(WORKSPACES))
  const mine = bodyOf(listOf(WORKSPACES.filter((one) => one !== "game-characters-stats")))
  const theirs = bodyOf(listOf(WORKSPACES.filter((one) => one !== "game-items-addon")))
  const said = textOf(mergedOnto(base, mine, theirs))
  expect(said).not.toContain("game-items-addon")
  expect(said).not.toContain("game-characters-stats")
  expect(said).toContain("game-crafting")
})

test("two changes touching one line are refused, and the refusal counts them", () => {
  const base = bodyOf("one\ntwo\nthree\n")
  const mine = bodyOf("one\nMINE\nthree\n")
  const theirs = bodyOf("one\nTHEIRS\nthree\n")
  const said = mergedOnto(base, mine, theirs)
  expect(whyIn(said)).toBe(
    "it moved under this change in 1 place this change also moved, so the two cannot be merged"
  )
})

test("a merge that conflicts twice says two places", () => {
  const base = bodyOf("a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\n")
  const mine = bodyOf("A\nb\nc\nd\ne\nf\ng\nh\ni\nj\nK\n")
  const theirs = bodyOf("z\nb\nc\nd\ne\nf\ng\nh\ni\nj\nz\n")
  const said = mergedOnto(base, mine, theirs)
  expect(whyIn(said)).toBe(
    "it moved under this change in 2 places this change also moved, so the two cannot be merged"
  )
})

test("a path taken away under a change that writes it refuses that change", () => {
  const said = mergedOnto(bodyOf("one\n"), bodyOf("one\ntwo\n"), null)
  expect(said).toEqual({
    why: "it was taken away while this change was written, so there is nothing to merge",
  })
})

test("a change taking a path away is refused where that path moved under it", () => {
  const said = mergedOnto(bodyOf("one\n"), null, bodyOf("one\ntwo\n"))
  expect(said).toEqual({
    why: "it moved under this change, which would take it away, so it is kept",
  })
})

test("a path two changes each make is refused", () => {
  const said = mergedOnto(null, bodyOf("mine\n"), bodyOf("theirs\n"))
  expect(said).toEqual({
    why: "it was made by another change as well, so there is no body to merge from",
  })
})

test("a path only this change makes is landed", () => {
  expect(textOf(mergedOnto(null, bodyOf("mine\n"), null))).toBe("mine\n")
})

test("a path both changes take away is answered as nothing rather than refused", () => {
  expect(mergedOnto(bodyOf("one\n"), null, null)).toEqual({ body: null })
})

test("a change taking away what it read unmoved is answered as nothing", () => {
  const base = bodyOf("one\n")
  expect(mergedOnto(base, null, base)).toEqual({ body: null })
})

test("bytes that are not text are refused rather than merged", () => {
  const base = new Uint8Array([1, 0, 2])
  const mine = new Uint8Array([1, 0, 3])
  const theirs = new Uint8Array([1, 0, 4])
  expect(mergedOnto(base, mine, theirs)).toEqual({
    why: "it is not text, so it cannot be merged line by line",
  })
})

test("bytes holding no zero that spell no text are refused rather than merged", () => {
  const base = new Uint8Array([0xff, 0xfe, 1])
  const mine = new Uint8Array([0xff, 0xfe, 2])
  const theirs = new Uint8Array([0xff, 0xfe, 3])
  expect(mergedOnto(base, mine, theirs)).toEqual({
    why: "it is not text, so it cannot be merged line by line",
  })
})

test("a body this change left alone is answered as what HEAD holds, text or not", () => {
  const base = new Uint8Array([0xff, 0xfe, 1])
  const theirs = new Uint8Array([0xff, 0xfe, 2])
  expect(mergedOnto(base, base, theirs)).toEqual({ body: theirs })
  expect(textOf(mergedOnto(bodyOf("one\n"), bodyOf("one\n"), bodyOf("two\n")))).toBe("two\n")
})

test("a body with no closing newline merges where the changes are apart", () => {
  const base = bodyOf("one\ntwo\nthree\nfour\nfive")
  const mine = bodyOf("ONE\ntwo\nthree\nfour\nfive")
  const theirs = bodyOf("one\ntwo\nthree\nfour\nFIVE")
  expect(textOf(mergedOnto(base, mine, theirs))).toBe("ONE\ntwo\nthree\nfour\nFIVE")
})

test("a last line with no closing newline that both changes moved is refused", () => {
  const said = mergedOnto(bodyOf("one\ntwo"), bodyOf("ONE\ntwo"), bodyOf("one\nTWO"))
  expect(whyIn(said)).toBe(
    "it moved under this change in 1 place this change also moved, so the two cannot be merged"
  )
})

test("a line conflict answers with the body git marked as well as with why", () => {
  const base = bodyOf("one\ntwo\nthree\n")
  const said = mergedOnto(base, bodyOf("one\nMINE\nthree\n"), bodyOf("one\nTHEIRS\nthree\n"))
  const marked = markedIn(said)
  expect(marked).toContain("MINE")
  expect(marked).toContain("THEIRS")
  expect(marked).toContain(CLASH_MARK)
  expect(clashing(bodyOf(marked))).toBe(true)
})

test("a conflict that is no line conflict answers with why alone", () => {
  expect("marked" in mergedOnto(null, bodyOf("mine\n"), bodyOf("theirs\n"))).toBe(false)
})

test("a body carrying no mark is carrying no conflict", () => {
  expect(clashing(bodyOf("one\ntwo\n"))).toBe(false)
  expect(clashing(null)).toBe(false)
})

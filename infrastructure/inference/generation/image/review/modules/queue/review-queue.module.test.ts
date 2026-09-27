import { expect, test } from "bun:test"
import { badgeVariantForColor } from "akasha/design/interface/badge/modules/color-badge-variant/color-badge-variant.module.code.ts"
import {
  aheadOf,
  answered,
  countsOf,
  dropped,
  GRADE_KEYS,
  gradeColor,
  graded,
  gradeSaid,
  LOOKAHEAD,
  OPENING,
  type Queued,
  type Review,
  shownOf,
  skipped,
  stepBack,
  undone,
  unwritten,
  WINDOW,
} from "akasha/infrastructure/inference/generation/image/review/modules/queue/review-queue.module.code.ts"

function queued(count: number, from = 0): readonly Queued[] {
  return Array.from({ length: count }, (_, at) => ({
    id: `id-${from + at}`,
    slug: `image-${from + at}`,
  }))
}

function holding(rows: readonly Queued[], total = rows.length, base = 0, at = 0): Review {
  return { ...OPENING, rows, total, base, at }
}

function gradeOf(digit: string): string | undefined {
  return GRADE_KEYS.find((one) => one.digit === digit)?.grade
}

test("The keys 7 8 9 grade `S-` `S` `S+`.", () => {
  expect(["7", "8", "9"].map(gradeOf)).toEqual(["S-", "S", "S+"])
})

test("The keys 4 5 6 grade `A-` `A` `A+`.", () => {
  expect(["4", "5", "6"].map(gradeOf)).toEqual(["A-", "A", "A+"])
})

test("The keys 1 2 3 grade `B-` `B` `B+`.", () => {
  expect(["1", "2", "3"].map(gradeOf)).toEqual(["B-", "B", "B+"])
})

test("The key 0 grades an image `F`.", () => {
  expect(gradeOf("0")).toBe("F")
  expect(GRADE_KEYS).toHaveLength(10)
})

test("The key 0 reads as Delete, since an image graded `F` is deleted.", () => {
  expect(gradeSaid("F")).toBe("Delete")
  expect(gradeSaid("A")).toBe("A")
  expect(gradeSaid("S+")).toBe("S+")
})

test("A grade's color is read off the grade ladder.", () => {
  expect(badgeVariantForColor(gradeColor("S+"))).toBe("purple")
  expect(badgeVariantForColor(gradeColor("A"))).toBe("blue")
  expect(badgeVariantForColor(gradeColor("B-"))).toBe("green")
  expect(badgeVariantForColor(gradeColor("F"))).toBe("red")
})

test("Grading an image shows the next image the review covers.", () => {
  const stepped = graded(holding(queued(10), 40), "A")
  expect(shownOf(stepped.review)?.id).toBe("id-1")
  expect(stepped.review.total).toBe(39)
  expect(stepped.review.done).toEqual([{ one: { id: "id-0", slug: "image-0" }, grade: "A" }])
  expect(stepped.asking).toEqual({ base: 0, limit: WINDOW, place: "kept" })
  expect(countsOf(stepped.review).get("A")).toBe(1)
})

test("Skipping past the last image the review covers comes round to the first.", () => {
  const whole = skipped(holding(queued(3), 3, 0, 2))
  expect(whole.asking).toBeNull()
  expect(shownOf(whole.review)?.id).toBe("id-0")
  const later = skipped(holding(queued(3, 57), 60, 57, 2))
  expect(later.asking).toEqual({ base: 0, limit: WINDOW, place: "first" })
  const onward = skipped(holding(queued(3), 10, 0, 2))
  expect(onward.asking).toEqual({ base: 3, limit: WINDOW, place: "first" })
})

test("Stepping back before the first image comes round to the last.", () => {
  const whole = stepBack(holding(queued(3)))
  expect(shownOf(whole.review)?.id).toBe("id-2")
  const wide = stepBack(holding(queued(5), 500))
  expect(wide.asking).toEqual({ base: 500 - WINDOW, limit: WINDOW, place: "last" })
  const inner = stepBack(holding(queued(5, 20), 500, 20))
  expect(inner.asking).toEqual({ base: 0, limit: 20, place: "last" })
})

test("Undoing the last grade shows that image again and counts it back in.", () => {
  const after = graded(holding(queued(4), 4), "S").review
  const back = undone(after)
  expect(back.undid?.grade).toBe("S")
  expect(shownOf(back.review)?.id).toBe("id-0")
  expect(back.review.total).toBe(4)
  expect(back.review.done).toHaveLength(0)
  expect(undone(back.review).undid).toBeNull()
})

test("An image graded elsewhere leaves the review.", () => {
  const review = holding(queued(4), 4, 0, 2)
  const before = dropped(review, "id-0")
  expect(shownOf(before)?.id).toBe("id-2")
  expect(before.total).toBe(3)
  const shown = dropped(review, "id-2")
  expect(shownOf(shown)?.id).toBe("id-3")
  expect(dropped(review, "id-9")).toBe(review)
})

test("An image whose grade is still being written is left out of what the store answers.", () => {
  const review = holding(queued(4), 4, 0, 1)
  const again = answered(review, { base: 0, rows: queued(4), total: 4 }, "kept", new Set(["id-0"]))
  expect(again.rows.map((one) => one.id)).toEqual(["id-1", "id-2", "id-3"])
  expect(again.total).toBe(3)
  expect(shownOf(again)?.id).toBe("id-1")
})

test("A grade that fails to be written puts its image back.", () => {
  const after = graded(holding(queued(4), 4), "B").review
  const back = unwritten(after, { id: "id-0", slug: "image-0" })
  expect(shownOf(back)?.id).toBe("id-0")
  expect(back.total).toBe(4)
  expect(back.done).toHaveLength(0)
})

test("A review asks the store for more images before the images it holds run out.", () => {
  const near = skipped(holding(queued(6), 1000, 0, 1))
  expect(near.asking).toEqual({ base: 2, limit: WINDOW, place: "kept" })
  const far = skipped(holding(queued(WINDOW), 1000))
  expect(far.asking).toBeNull()
  const last = graded(holding(queued(1), 100), "A")
  expect(last.asking).toEqual({ base: 0, limit: WINDOW, place: "first" })
})

test("A review asks for more images while a hundred are still held ahead.", () => {
  const stepped = skipped(holding(queued(LOOKAHEAD + 50, 40), 1000, 40, 0))
  expect(aheadOf(stepped.review)).toHaveLength(LOOKAHEAD)
  expect(stepped.asking).toEqual({ base: 41, limit: WINDOW, place: "kept" })
  const answer = { base: 41, rows: queued(WINDOW, 41), total: 1000 }
  const refilled = answered(stepped.review, answer, "kept", new Set())
  expect(shownOf(refilled)?.id).toBe("id-41")
  expect(aheadOf(refilled)).toHaveLength(LOOKAHEAD)
  expect(skipped(refilled).asking).toBeNull()
})

test("The hundred images after the one shown are held ahead.", () => {
  const ahead = aheadOf(holding(queued(WINDOW), WINDOW, 0, 2))
  expect(ahead).toHaveLength(LOOKAHEAD)
  expect(ahead[0]?.id).toBe("id-3")
  expect(ahead.at(-1)?.id).toBe(`id-${LOOKAHEAD + 2}`)
  expect(aheadOf(holding(queued(2))).map((one) => one.id)).toEqual(["id-1"])
})

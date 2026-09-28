"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  type Asking,
  answered,
  dropped,
  type Grade,
  graded,
  OPENING,
  openingAsked,
  type Queued,
  type Review,
  regraded,
  type Stepped,
  shownOf,
  skipped,
  stepBack,
  undone,
  unwritten,
  WINDOW,
} from "akasha/infrastructure/inference/generation/image/review/modules/queue/review-queue.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { upsertPages } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

const IMAGE = "image"

const GRADE = "grade"

export type Heard =
  | { readonly state: "asking" }
  | { readonly state: "heard" }
  | { readonly state: "refused"; readonly why: string }

type Following = {
  readonly review: Review
  readonly heard: Heard
  readonly grade: (grade: Grade) => undefined
  readonly skip: () => undefined
  readonly back: () => undefined
  readonly undo: () => undefined
}

function queuedIn(values: Readonly<Record<string, unknown>>): Queued | null {
  const { id, slug } = values
  return typeof id === "string" && typeof slug === "string" ? { id, slug } : null
}

function whereFor(persona: string | null): Readonly<Record<string, unknown>> {
  return {
    [GRADE]: { empty: true },
    ...(persona === null ? {} : { persona: { is: persona } }),
  }
}

export function useReviewFollowing(persona: string | null, ready: boolean): Following {
  const [review, setReview] = useState<Review>(OPENING)
  const [heard, setHeard] = useState<Heard>({ state: "asking" })
  const held = useRef<Review>(OPENING)
  const pending = useRef(new Set<string>())
  const asked = useRef(0)
  const writing = useRef<Promise<unknown>>(Promise.resolve())

  const hold = useCallback((next: (was: Review) => Review): undefined => {
    held.current = next(held.current)
    setReview(held.current)
  }, [])

  const ask = useCallback(
    (asking: Asking): undefined => {
      asked.current += 1
      const mine = asked.current
      void askComposed({
        "page-type": IMAGE,
        where: whereFor(persona),
        keys: ["id", "slug"],
        "sort-by": "id",
        limit: asking.limit,
        offset: asking.base,
      }).then((said) => {
        if (mine !== asked.current) return
        if (!said.ok) {
          setHeard({ state: "refused", why: said.why })
          return
        }
        const rows: Queued[] = []
        for (const row of said.answer.rows) {
          const one = queuedIn(row.values)
          if (one !== null) rows.push(one)
        }
        const answer = { base: asking.base, rows, total: said.answer.n }
        hold((was) => answered(was, answer, asking.place, pending.current))
        setHeard({ state: "heard" })
      })
      return undefined
    },
    [persona, hold]
  )

  const step = useCallback(
    (stepped: Stepped): undefined => {
      hold(() => stepped.review)
      if (stepped.asking !== null) ask(stepped.asking)
      return undefined
    },
    [hold, ask]
  )

  const again = useCallback((): undefined => {
    const now = held.current
    return ask({ base: now.base, limit: Math.max(WINDOW, now.rows.length), place: "kept" })
  }, [ask])

  useEffect(() => {
    if (!ready) return
    held.current = OPENING
    setReview(OPENING)
    setHeard({ state: "asking" })
    ask(openingAsked())
  }, [ready, ask])

  const shownId = shownOf(review)?.id ?? null

  useEffect(() => {
    if (!ready) return
    let gone = false
    let watch: PageWatch | null = null
    if (shownId !== null) {
      void getPagesStore().then((store) => {
        if (!gone) watch = store.watchPage(IMAGE, shownId, again)
      })
    }
    const timer = setInterval(again, FILE_BACKING_POLL_MS)
    return () => {
      gone = true
      clearInterval(timer)
      watch?.release()
    }
  }, [ready, shownId, again])

  const grade = useCallback(
    (given: Grade): undefined => {
      const one = shownOf(held.current)
      if (one === null) return undefined
      pending.current.add(one.id)
      step(graded(held.current, given))
      writing.current = writing.current
        .then(() =>
          patchPage({
            pageTypeSlug: IMAGE,
            where: [{ key: "id", eq: one.id }],
            set: { [GRADE]: given },
          })
        )
        .then(
          (page) => {
            if (page === null) toast(`${one.slug} is no longer there`)
          },
          (thrown: unknown) => {
            hold((was) => unwritten(was, one))
            toast.error(`${one.slug} was not graded: ${saidBy(thrown)}`)
          }
        )
        .finally(() => {
          pending.current.delete(one.id)
        })
      return undefined
    },
    [step, hold]
  )

  const undo = useCallback((): undefined => {
    const back = undone(held.current)
    const undid = back.undid
    if (undid === null) {
      toast("Nothing to undo")
      return undefined
    }
    hold(() => back.review)
    writing.current = writing.current
      .then(() =>
        upsertPages({
          pageTypeSlug: IMAGE,
          items: [{ where: [{ key: "id", eq: undid.one.id }], set: {}, clears: [GRADE] }],
        })
      )
      .then(
        () => {
          toast(`${undid.grade} taken off ${undid.one.slug}`)
        },
        (thrown: unknown) => {
          hold((was) => dropped(regraded(was, undid), undid.one.id))
          toast.error(`${undid.one.slug} still states ${undid.grade}: ${saidBy(thrown)}`)
        }
      )
    return undefined
  }, [hold])

  const skip = useCallback((): undefined => step(skipped(held.current)), [step])

  const back = useCallback((): undefined => step(stepBack(held.current)), [step])

  return { review, heard, grade, skip, back, undo }
}

"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import {
  type QuestionDetail as QuestionDetailData,
  resolveQuestionDetail,
} from "~/questions/lib/question-detail-loader"

const QuestionDetail = lazy(() => import("~/questions/question-detail"))

export function QuestionAnswerArm({
  questionId,
  pageTypeSlug,
}: {
  questionId: string
  pageTypeSlug: string
}) {
  const [detail, setDetail] = useState<QuestionDetailData | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const resolved = await resolveQuestionDetail({ id: questionId, pageTypeSlug })
      if (!cancelled) setDetail(resolved)
    })()
    return () => {
      cancelled = true
    }
  }, [questionId, pageTypeSlug])

  if (detail === null) {
    return (
      <main className="mx-auto max-w-2xl p-6 text-primary">
        <p className="text-secondary">Loading…</p>
      </main>
    )
  }

  return (
    <Suspense fallback={null}>
      <QuestionDetail question={detail.question} persona={detail.persona} />
    </Suspense>
  )
}

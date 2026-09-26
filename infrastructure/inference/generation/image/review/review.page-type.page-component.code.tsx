"use client"

import { Badge, BadgeRow } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { badgeVariantForColor } from "akasha/design/interface/badge/modules/color-badge-variant/color-badge-variant.module.code.ts"
import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PAGE_TITLE_CLASSES } from "akasha/design/interface/layout/modules/page-layout-data/page-layout-data.module.code.ts"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Kbd } from "akasha/design/interface/pattern/modules/kbd/kbd.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import type { KeyBinding } from "akasha/design/interface/primitive/modules/keyboard-registry/keyboard-registry.module.code.ts"
import { Progress } from "akasha/design/interface/primitive/modules/progress-bar/progress-bar.module.code.tsx"
import { Skeleton } from "akasha/design/interface/primitive/modules/skeleton/skeleton.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { useKeyboardBindings } from "akasha/design/interface/primitive/modules/use-keyboard-registry/use-keyboard-registry.module.code.ts"
import {
  type Heard,
  useReviewFollowing,
} from "akasha/infrastructure/inference/generation/image/review/modules/following/review-following.module.code.ts"
import {
  aheadOf,
  countsOf,
  GRADE_KEYS,
  type Grade,
  gradeColor,
  type Queued,
  type Review,
  shownOf,
} from "akasha/infrastructure/inference/generation/image/review/modules/queue/review-queue.module.code.ts"
import { pageName } from "akasha/page/core/modules/page-name/page-name.module.code.ts"
import { coverSource } from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type Seen = {
  readonly id: string
  readonly loaded: boolean
  readonly width: number
  readonly height: number
}

const GROUP = "Review"

const SUBDUED = "font-mono text-secondary text-xs"

function sourceOf(one: Queued): string | null {
  return coverSource(`image/${one.slug}`)
}

function GradeBadge({ grade }: { grade: Grade }) {
  return <Badge variant={badgeVariantForColor(gradeColor(grade))}>{grade}</Badge>
}

function keysFor(
  grade: (given: Grade) => undefined,
  following: { skip: () => undefined; back: () => undefined; undo: () => undefined }
): readonly KeyBinding[] {
  const named = (id: string, chord: string, label: string, onTrigger: () => undefined) => ({
    id: `review.${id}`,
    chord,
    label,
    group: GROUP,
    layer: "house" as const,
    onTrigger,
  })
  return [
    ...GRADE_KEYS.map((key) =>
      named(`grade-${key.digit}`, key.digit, `Grade ${key.grade}`, () => grade(key.grade))
    ),
    named("undo", "u", "Undo the last grade", following.undo),
    named("undo-backspace", "Backspace", "Undo the last grade", following.undo),
    named("skip", "Space", "Skip", following.skip),
    named("skip-right", "ArrowRight", "Skip", following.skip),
    named("back", "ArrowLeft", "Back", following.back),
  ]
}

function Stage({
  shown,
  seen,
  onSeen,
}: {
  shown: Queued
  seen: Seen | null
  onSeen: (seen: Seen) => void
}) {
  const surface = useSurface()
  const src = sourceOf(shown)
  const drawn = seen !== null && seen.id === shown.id ? seen : null
  const said =
    drawn === null
      ? shown.slug
      : drawn.loaded
        ? `${shown.slug} · ${drawn.width} × ${drawn.height}`
        : `${shown.slug} would not load, so it takes no grade here`
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "relative flex h-[70vh] items-center justify-center overflow-hidden rounded-md",
          surfaceClass(surface + 1)
        )}
      >
        {src !== null && (
          <img
            key={shown.id}
            src={src}
            alt={shown.slug}
            onLoad={(event) =>
              onSeen({
                id: shown.id,
                loaded: true,
                width: event.currentTarget.naturalWidth,
                height: event.currentTarget.naturalHeight,
              })
            }
            onError={() => onSeen({ id: shown.id, loaded: false, width: 0, height: 0 })}
            className="block max-h-full max-w-full object-contain"
          />
        )}
        {drawn === null && <Skeleton className="absolute inset-0" />}
      </div>
      <p className={SUBDUED}>{said}</p>
    </div>
  )
}

function Pad({
  grade,
  following,
}: {
  grade: (given: Grade) => undefined
  following: { skip: () => undefined; back: () => undefined; undo: () => undefined }
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        {GRADE_KEYS.map((key) => (
          <Button
            key={key.digit}
            size="sm"
            className={key.digit === "0" ? "col-span-3" : undefined}
            onClick={() => grade(key.grade)}
          >
            <GradeBadge grade={key.grade} />
            <Kbd>{key.digit}</Kbd>
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="tertiary" size="sm" onClick={following.back}>
          Back <Kbd>←</Kbd>
        </Button>
        <Button variant="tertiary" size="sm" onClick={following.skip}>
          Skip <Kbd>Space</Kbd>
        </Button>
        <Button variant="tertiary" size="sm" onClick={following.undo}>
          Undo <Kbd>U</Kbd>
        </Button>
      </div>
    </div>
  )
}

function Tally({ review }: { review: Review }) {
  const counts = countsOf(review)
  if (counts.size === 0) return null
  return (
    <BadgeRow>
      {[...GRADE_KEYS].reverse().flatMap((key) => {
        const count = counts.get(key.grade)
        if (count === undefined) return []
        return [
          <Badge key={key.grade} variant={badgeVariantForColor(gradeColor(key.grade))}>
            {key.grade} · {count}
          </Badge>,
        ]
      })}
    </BadgeRow>
  )
}

function Unshown({ heard }: { heard: Heard }) {
  if (heard.state === "asking") return <Skeleton className="h-[70vh] w-full" />
  if (heard.state === "refused") {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>The images went unread</EmptyTitle>
          <EmptyDescription>{heard.why}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Nothing left to grade</EmptyTitle>
        <EmptyDescription>Every image this review covers states a grade.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  const { page, isLoading } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const persona = typeof data.persona === "string" && data.persona !== "" ? data.persona : null
  const following = useReviewFollowing(persona, page != null)
  const { review, heard } = following
  const shown = shownOf(review)
  const [seen, setSeen] = useState<Seen | null>(null)

  const grade = (given: Grade): undefined => {
    if (shown === null) return undefined
    if (seen === null || seen.id !== shown.id) {
      toast("Still loading")
      return undefined
    }
    if (!seen.loaded) {
      toast(`${shown.slug} would not load, so it takes no grade here`)
      return undefined
    }
    return following.grade(given)
  }

  useKeyboardBindings(keysFor(grade, following))

  useEffect(() => {
    for (const one of aheadOf(review)) {
      const src = sourceOf(one)
      if (src !== null) new Image().src = src
    }
  }, [review])

  const graded = review.done.length
  const covered = graded + review.total
  const share = heard.state !== "heard" ? 0 : covered === 0 ? 100 : (graded / covered) * 100

  return (
    <PageLayout loading={isLoading} skeleton={simplePageSkeleton({ titleWidth: 160 })}>
      {page != null && <title>{pageName(data)}</title>}
      <PageLayout.Content>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className={PAGE_TITLE_CLASSES}>{pageName(data)}</h1>
            {heard.state === "heard" && (
              <span className="font-mono text-secondary text-sm">{review.total} left</span>
            )}
          </div>
          <Progress value={share} />
          {shown === null ? (
            <Unshown heard={heard} />
          ) : (
            <Stage shown={shown} seen={seen} onSeen={setSeen} />
          )}
          {shown !== null && <Pad grade={grade} following={following} />}
          <Tally review={review} />
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}

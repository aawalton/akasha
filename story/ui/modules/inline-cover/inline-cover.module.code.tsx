"use client"

import { DegradingImage } from "akasha/page/ui/component/modules/degrading-image/degrading-image.module.code.tsx"
import { coverSource } from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import { COVER_WIDTH_ASKED } from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import { CoverDialog } from "akasha/story/ui/modules/cover-viewing/cover-viewing.module.code.tsx"
import {
  RerollButton,
  useReroll,
} from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import { useState } from "react"

export type InlineCover = {
  readonly id: string
  readonly number: number
  readonly cover: string
  readonly after?: string | undefined
}

const NOT_A_WORD = /[^\p{L}\p{N}]+/gu

const SPACE = " "

export function anchorKey(text: string): string {
  return text.toLowerCase().replace(NOT_A_WORD, SPACE).trim()
}

function openingAt(keys: readonly string[], key: string, from: number): number {
  for (let at = from; at < keys.length; at++) if (keys[at]?.startsWith(key) === true) return at
  for (let at = 0; at < from; at++) if (keys[at]?.startsWith(key) === true) return at
  return -1
}

export type Placed<T> = {
  readonly after: ReadonlyMap<number, readonly T[]>
  readonly rest: readonly T[]
}

export function placedAfter<T extends { readonly after?: string | undefined }>(
  paragraphs: readonly string[],
  covers: readonly T[]
): Placed<T> {
  const keys = paragraphs.map(anchorKey)
  const after = new Map<number, T[]>()
  const rest: T[] = []
  let from = 0
  for (const one of covers) {
    const key = one.after === undefined ? "" : anchorKey(one.after)
    const at = key === "" ? -1 : openingAt(keys, key, from)
    if (at === -1) {
      rest.push(one)
      continue
    }
    after.set(at, [...(after.get(at) ?? []), one])
    from = at
  }
  return { after, rest }
}

export function coversOf<T extends { readonly of?: string | undefined }>(
  covers: readonly T[],
  of: string
): readonly T[] {
  return covers.filter((one) => one.of === of)
}

const FRAME_WIDTH = 832

const FRAME_HEIGHT = 1216

const FRAME_WIDEST = "480px"

export const FRAME = {
  aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
  width: "100%",
  maxWidth: FRAME_WIDEST,
} as const

type InlineCoverProps = {
  readonly shown: InlineCover
  readonly gameExternalId?: string | undefined
}

export function InlineCoverFigure({ shown, gameExternalId }: InlineCoverProps) {
  const [viewing, setViewing] = useState(false)
  const rerolling = useReroll(gameExternalId)
  const source = coverSource(shown.cover, COVER_WIDTH_ASKED)
  const whole = coverSource(shown.cover)
  if (source === null || whole === null) return null
  const name = `Turn ${shown.number}`
  const reroll =
    gameExternalId === undefined ? null : <RerollButton rerolling={rerolling} cover={shown.cover} />
  return (
    <figure className="flex flex-col items-center gap-2 py-2">
      <CoverDialog open={viewing} onOpenChange={setViewing} name={name} whole={whole}>
        {reroll}
      </CoverDialog>
      <div className="relative" style={FRAME}>
        <button
          type="button"
          aria-label={`View the picture of turn ${shown.number} full size`}
          className="absolute inset-0 block cursor-zoom-in overflow-hidden rounded-md bg-black/20"
          onClick={() => setViewing(true)}
        >
          <DegradingImage
            src={source}
            alt={name}
            className="block h-full w-full object-contain"
            fallback={null}
          />
        </button>
        {reroll}
      </div>
      {rerolling.refused === null ? null : (
        <p role="alert" className="text-[12px] text-secondary">
          {rerolling.refused}
        </p>
      )}
    </figure>
  )
}

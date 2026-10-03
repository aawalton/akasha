"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { useCallback, useState } from "react"

const INTENT = "playerIntent"

const SLUG = "slug"

const PANEL = "flex flex-col gap-2 rounded-xl p-4 shadow-sm"

const HEADING = "text-secondary text-sm"

const NOTE = "font-mono text-[12px] text-tertiary"

const ERROR_LINE = "font-mono text-[12px] text-red"

const BOX = "max-h-72 min-h-24 resize-y"

const PLACEHOLDER = "What your character keeps doing: meals, drink, sleep, and the like."

const NOTHING_YET = "Nothing written yet."

const NO_ADDRESS = "This story answers no address, so nothing was written."

const UNSAVED = "Unsaved."

const KEPT = "Saved. The game master reads this before it beats a turn."

export type Asking = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly intent: string
}

export type Saving = (asked: Asking) => Promise<void>

async function overPages(asked: Asking): Promise<void> {
  await patchPage({
    pageTypeSlug: asked.pageTypeSlug,
    where: [{ key: SLUG, eq: asked.slug }],
    set: { [INTENT]: asked.intent },
  })
}

export async function intentKept(
  storyAddress: string,
  intent: string,
  saving: Saving = overPages
): Promise<string | null> {
  const address = addressIn(storyAddress)
  if (address.kind !== "qualified") return NO_ADDRESS
  try {
    await saving({ pageTypeSlug: address.pageTypeSlug, slug: address.slug, intent })
    return null
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

function savedSaid(dirty: boolean, intent: string): string {
  if (dirty) return UNSAVED
  return intent.trim() === "" ? NOTHING_YET : KEPT
}

export function PlayerIntentPanel({
  storyAddress,
  intent,
}: {
  readonly storyAddress: string
  readonly intent: string
}) {
  const [text, setText] = useState(intent)
  const [kept, setKept] = useState(intent)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dirty = text !== kept

  const save = useCallback(async () => {
    setSaving(true)
    setError(null)
    const refused = await intentKept(storyAddress, text)
    if (refused === null) setKept(text)
    else setError(refused)
    setSaving(false)
  }, [storyAddress, text])

  return (
    <SurfaceProvider level={1} className={PANEL}>
      <p className={HEADING}>Intent</p>
      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        placeholder={PLACEHOLDER}
        aria-label="Your standing intent"
        className={BOX}
      />
      {error === null ? null : <p className={ERROR_LINE}>{error}</p>}
      <div className="flex items-center justify-between gap-2">
        <p className={NOTE}>{error === null ? savedSaid(dirty, kept) : ""}</p>
        <Button type="button" onClick={() => void save()} disabled={saving || !dirty}>
          Save
        </Button>
      </div>
    </SurfaceProvider>
  )
}

"use client"

import { formatPlayerChoiceAction } from "@alanwalton/awen-core/choice-action"
import { type SystemChoice } from "@alanwalton/awen-core/system-window-schema"
import { Button, SurfaceProvider } from "@shared/design-system"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useUserId } from "@shared/pages-ui/use-user-id"
import { useState } from "react"
import { SignedOutNotice } from "~/components/signed-out-notice"
import { submitPlayerAction } from "../lib/submit-player-action"

export function SystemChoiceCard({
  choice,
  gameExternalId,
  windowId,
}: {
  choice: SystemChoice
  gameExternalId?: string
  windowId?: string
}) {
  const userId = useUserId()
  const [picked, setPicked] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submittedOptionId, setSubmittedOptionId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [signedOut, setSignedOut] = useState(false)

  const resolvedOptionId = choice.selectedOptionId ?? submittedOptionId
  const resolved = resolvedOptionId !== null && resolvedOptionId !== undefined
  const canAct =
    userId !== null &&
    gameExternalId !== undefined &&
    windowId !== undefined &&
    windowId !== "" &&
    !resolved

  async function onConfirm() {
    if (!canAct || picked === null || submitting) return
    if (gameExternalId === undefined || windowId === undefined) return
    const option = choice.options.find((o) => o.id === picked)
    if (option === undefined) return
    setSubmitting(true)
    setError(null)
    setSignedOut(false)
    const result = await submitPlayerAction({
      gameExternalId,
      text: formatPlayerChoiceAction(
        { windowId, choiceId: choice.id, optionId: option.id },
        option.label
      ),
    })
    if (result.ok) {
      setSubmittedOptionId(option.id)
    } else {
      setSignedOut(result.signedOut === true)
      setError(result.error)
    }
    setSubmitting(false)
  }

  return (
    <SurfaceProvider level={1} className="flex flex-col gap-2 rounded-xl p-4 shadow-sm">
      <div className="font-bold font-mono text-[11px] text-accent uppercase tracking-[0.2em]">
        Choice
      </div>
      <div className="font-mono font-semibold text-[14px] text-primary">{choice.title}</div>
      {choice.prompt != null && choice.prompt !== "" ? (
        <div className="text-[13px] text-secondary leading-[1.5]">{choice.prompt}</div>
      ) : null}
      <div className="flex flex-col gap-2">
        {choice.options.map((option) => {
          const isResolvedPick = resolved && resolvedOptionId === option.id
          const isLocalPick = !resolved && picked === option.id
          const selectable = canAct
          return (
            <button
              key={option.id}
              type="button"
              disabled={!selectable}
              aria-pressed={isResolvedPick || isLocalPick}
              onClick={selectable ? () => setPicked(option.id) : undefined}
              className={`flex flex-col gap-[2px] rounded-lg border p-3 text-left transition-colors ${surfaceClass(
                2
              )} ${
                isResolvedPick || isLocalPick ? "border-accent" : "border-surface-3 border-dotted"
              } ${selectable ? "hover:border-accent" : "cursor-default"} ${
                resolved && !isResolvedPick ? "opacity-60" : ""
              }`}
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-mono font-semibold text-[13px] text-primary">
                  {option.label}
                </span>
                {isResolvedPick ? (
                  <span className="flex-none font-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                    chosen
                  </span>
                ) : null}
              </span>
              {option.detail != null && option.detail !== "" ? (
                <span className="text-[12px] text-tertiary leading-[1.4]">{option.detail}</span>
              ) : null}
            </button>
          )
        })}
      </div>
      {resolved ? (
        <div className="font-mono text-[11px] text-tertiary">Selection recorded.</div>
      ) : canAct ? (
        <div className="flex items-center gap-3">
          <Button type="button" onClick={onConfirm} disabled={picked === null || submitting}>
            {submitting ? "Confirming…" : "Confirm"}
          </Button>
          {signedOut ? (
            <SignedOutNotice />
          ) : error != null ? (
            <span className="font-mono text-[12px] text-red">⚠ {error}</span>
          ) : null}
        </div>
      ) : (
        <div className="font-mono text-[11px] text-tertiary">Sign in as the player to choose.</div>
      )}
    </SurfaceProvider>
  )
}

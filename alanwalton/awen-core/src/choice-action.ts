import { z } from "zod"

export const PlayerChoiceActionSchema = z
  .object({
    windowId: z.string().min(1),
    choiceId: z.string().min(1),
    optionId: z.string().min(1),
  })
  .strict()
export type PlayerChoiceAction = z.infer<typeof PlayerChoiceActionSchema>

export function formatPlayerChoiceAction(action: PlayerChoiceAction, optionLabel: string): string {
  const { windowId, choiceId, optionId } = PlayerChoiceActionSchema.parse(action)
  return `Selected "${optionLabel}" ⟨window:${windowId} choice:${choiceId} option:${optionId}⟩`
}

import {
  getAreaEffectCount,
  getStageInfo,
  getStageInfo2,
} from "@akasha/temper-combat-addon/combat-action-display"
import type { DurationCtx } from "@akasha/temper-combat-addon/combat-action-duration"
import { getStackEffect } from "@akasha/temper-combat-addon/combat-action-duration"
import type { Action } from "@akasha/temper-combat-addon/combat-action-types"

export type StackRightLabel =
  | { readonly kind: "count"; readonly text: string }
  | { readonly kind: "stage"; readonly text: string }
  | { readonly kind: "hidden" }

export type StackLeftLabel =
  | { readonly kind: "value"; readonly text: string }
  | { readonly kind: "hidden" }

export interface StackLabels {
  readonly right: StackRightLabel
  readonly left: StackLeftLabel
}

export function resolveStackLabels(action: Action, ctx: DurationCtx): StackLabels {
  const stackEffect = getStackEffect(action, ctx)
  const stackEffectHasStageInfo = stackEffect !== undefined && stackEffect.stageInfo !== undefined
  const stackCount = stackEffect !== undefined ? stackEffect.stackCount : 0

  let stageInfo = getStageInfo(action, ctx)
  if (stageInfo === undefined) {
    const areaCount = getAreaEffectCount(action)
    if (areaCount > 0) {
      stageInfo = `${areaCount}`
    }
  }

  let right: StackRightLabel
  if (stackCount > 0 && !stackEffectHasStageInfo) {
    right = { kind: "count", text: `${stackCount}` }
  } else if (stageInfo !== undefined) {
    right = { kind: "stage", text: stageInfo }
  } else {
    right = { kind: "hidden" }
  }

  let left: StackLeftLabel = { kind: "hidden" }
  if (right.kind !== "count") {
    const stageInfo2 = getStageInfo2(action, ctx)
    if (stageInfo2 !== undefined) {
      left = { kind: "value", text: stageInfo2 }
    }
  }

  return { right, left }
}

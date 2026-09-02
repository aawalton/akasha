import {
  asBoolean,
  asCallback,
  asNumber,
  asRecord,
  asString,
  asTooltipControl,
} from "../journal-casts/journal-casts.module.code.ts"
import type { TooltipExtensionInstance } from "../journal-shape/journal-shape.module.code.ts"
import { Internal, Public } from "../journal-state/journal-state.module.code.ts"
import { ExtendedJournalTooltipExtension } from "../journal-tooltip-extension/journal-tooltip-extension.module.code.ts"

const Controls = Internal.controls

Public.InitializeTooltip = (control?: TooltipControl): TooltipControl => {
  const c = control ?? ExtendedJournalItemTooltip
  if (Internal.initialized) {
    InitializeTooltip(c, Controls.frame, TOPRIGHT, -100, 0, TOPLEFT)
  }
  return c
}

Public.ItemTooltip = (item: unknown, control?: TooltipControl): TooltipControl => {
  const c = Public.InitializeTooltip(control)
  if (type(item) === "string") {
    c.SetLink(asString(item))
  } else if (type(item) === "table") {
    const itemRecord = asRecord(item)
    if (type(itemRecord.collectibleId) === "number") {
      c.SetCollectible(asNumber(itemRecord.collectibleId), true, false)
    } else if (type(itemRecord.antiquityId) === "number") {
      const antiquityId = asNumber(itemRecord.antiquityId)
      if (GetAntiquitySetId(antiquityId) === 0) {
        c.SetAntiquityLead(antiquityId)
      } else {
        c.SetAntiquitySetFragment(antiquityId)
      }
    }
  }
  return c
}

const EXTENSIONS: Record<string, TooltipExtensionInstance | undefined> = {}

function tooltipExtensionAcquire(this: void, name?: string): TooltipExtensionInstance {
  const key = name ?? "Default"
  let ext = EXTENSIONS[key]
  if (ext === undefined) {
    ext = ExtendedJournalTooltipExtension.New(key)
    EXTENSIONS[key] = ext
  }
  return ext
}

Public.TooltipExtensionInitialize = (
  showDivider: boolean,
  textLeft?: string,
  textRight?: string,
  name?: string,
  appendExisting?: boolean
): TooltipExtensionInstance =>
  tooltipExtensionAcquire(name).Initialize(showDivider, textLeft, textRight, appendExisting)

Public.TooltipExtensionAddSection = (...args: unknown[]): undefined => {
  const textHeader = args[0] === undefined ? undefined : asString(args[0])
  const textBody = args[1] === undefined ? undefined : asString(args[1])
  const alignBody = args[2] === undefined ? undefined : asNumber(args[2])
  tooltipExtensionAcquire().AddSection(textHeader, textBody, alignBody)
}

Public.TooltipExtensionFinalize = (...args: unknown[]): undefined => {
  const flag = args[1]
  const showEmptyOrUnloadCallback =
    type(flag) === "function"
      ? asCallback(flag)
      : type(flag) === "boolean"
        ? asBoolean(flag)
        : undefined
  tooltipExtensionAcquire().Finalize(asTooltipControl(args[0]), showEmptyOrUnloadCallback)
}

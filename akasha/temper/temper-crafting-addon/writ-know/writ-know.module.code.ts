import { add as logAdd } from "../writ-log/writ-log.module.code.ts"
import type { ColorString, Know, KnowArgs, KnowKind } from "../writ-types/writ-types.module.code.ts"
import { KNOW } from "../writ-types/writ-types.module.code.ts"
import { COLOR_ORANGE, COLOR_RED, color } from "../writ-util/writ-util.module.code.ts"

export function newKnow(args: KnowArgs): Know {
  const o: Know = {
    name: args.name,
    is_known: args.is_known,
    is_warn: args.is_warn,
    lack_msg: args.lack_msg,
    how: args.how,
    DebugText(this: Know): string {
      return string.format("%s:%s", this.name, tostring(this.is_known))
    },
    TooltipText(this: Know): ColorString | undefined {
      if (this.is_known) {
        return undefined
      }
      let colorHex = COLOR_RED
      if (this.is_warn === true) {
        colorHex = COLOR_ORANGE
      }
      return color(colorHex, this.lack_msg)
    },
  }
  logAdd(
    "is_known:" +
      tostring(args.is_known) +
      " name:" +
      tostring(args.name) +
      " lack_msg:" +
      tostring(args.lack_msg)
  )
  return o
}

export interface KnowNamespace {
  New: (this: KnowNamespace, args: KnowArgs) => Know
  KNOW: {
    MOTIF: KnowKind
    RECIPE: KnowKind
    TRAIT: KnowKind
    TRAIT_CT_FOR_SET: KnowKind
    SKILL_COST_REDUCTION: KnowKind
    SKILL_REQUIRED: KnowKind
  }
}

const KNOW_NAMESPACE: KnowNamespace = {
  New: newKnow,
  KNOW,
}

TemperWrit.Know = KNOW_NAMESPACE

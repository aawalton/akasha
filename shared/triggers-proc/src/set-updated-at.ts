import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"

export type RowWithUpdatedAt = {
  updatedAt: string
}

export function setUpdatedAt(ctx: TriggerProcCtx<RowWithUpdatedAt>): TriggerReturn {
  if (
    ctx.currentSetting("app.skip_updated_at_touch", true) !== "on" &&
    (ctx.OLD === null || ctx.NEW.updatedAt === ctx.OLD.updatedAt)
  ) {
    ctx.NEW.updatedAt = ctx.now()
  }
  return "NEW"
}

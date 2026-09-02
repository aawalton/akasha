import "../slash-commander-declarations/slash-commander-declarations.module.code.ts"
import "../slash-commander-descriptions/slash-commander-descriptions.module.code.ts"
import "../slash-command/slash-command.module.code.ts"
import "../slash-commander-providers/slash-commander-providers.module.code.ts"
import "../slash-commander-chat-hooks/slash-commander-chat-hooks.module.code.ts"
import { SLASH_COMMANDER } from "../slash-commander-surface/slash-commander-surface.module.code.ts"
import type { Lib } from "../slash-commander-types/slash-commander-types.module.code.ts"

declare global {
  var LibSlashCommander: Lib
}

globalThis.LibSlashCommander = SLASH_COMMANDER

SLASH_COMMANDER.Init()

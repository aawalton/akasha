import "../slash-commander-descriptions/slash-commander-descriptions.module.code.ts"
import "../slash-command/slash-command.module.code.ts"
import "../slash-commander-providers/slash-commander-providers.module.code.ts"
import "../slash-commander-chat-hooks/slash-commander-chat-hooks.module.code.ts"
import { SLASH_COMMANDER } from "../slash-commander-surface/slash-commander-surface.module.code.ts"

globalThis.LibSlashCommander = SLASH_COMMANDER

SLASH_COMMANDER.Init()

import "akasha/temper/addon/library/lib-slash-commander/modules/slash-commander-descriptions/slash-commander-descriptions.module.code.ts"
import "akasha/temper/addon/library/lib-slash-commander/modules/slash-command/slash-command.module.code.ts"
import "akasha/temper/addon/library/lib-slash-commander/modules/slash-commander-providers/slash-commander-providers.module.code.ts"
import "akasha/temper/addon/library/lib-slash-commander/modules/slash-commander-chat-hooks/slash-commander-chat-hooks.module.code.ts"
import { SLASH_COMMANDER } from "akasha/temper/addon/library/lib-slash-commander/modules/slash-commander-surface/slash-commander-surface.module.code.ts"

globalThis.LibSlashCommander = SLASH_COMMANDER

SLASH_COMMANDER.Init()

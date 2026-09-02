import { resetFight } from "@akasha/temper-combat-addon/combat-lib-fight"
import {
  POSTTOCHAT_MODE_HEALING,
  POSTTOCHAT_MODE_MULTI,
  POSTTOCHAT_MODE_SINGLEANDMULTI,
  POSTTOCHAT_MODE_SMART,
  postToChat,
} from "@akasha/temper-combat-addon/combat-ui-chat-report"
import { toggleReport } from "@akasha/temper-combat-addon/combat-ui-window"

function slashCommandFunction(this: void, extra: string): undefined {
  if (extra === "reset") {
    resetFight()
  } else if (extra === "dps") {
    postToChat(POSTTOCHAT_MODE_SMART)
  } else if (extra === "totdps") {
    postToChat(POSTTOCHAT_MODE_MULTI)
  } else if (extra === "alldps") {
    postToChat(POSTTOCHAT_MODE_SINGLEANDMULTI)
  } else if (extra === "hps") {
    postToChat(POSTTOCHAT_MODE_HEALING)
  } else {
    toggleReport()
  }
  return undefined
}

export function registerSlashCommands(): undefined {
  SLASH_COMMANDS["/cmx"] = slashCommandFunction
  return undefined
}

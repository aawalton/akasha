import { actionBoxIsRebuilding } from "@alanwalton/awen-core/action-box"
import type { InboundSender } from "~/lib/sender-surface"

export function deliverPlayerAction(
  _text: string,
  _coordinatorAgentName: string,
  _sender: InboundSender
): Promise<void> {
  return Promise.reject(actionBoxIsRebuilding())
}

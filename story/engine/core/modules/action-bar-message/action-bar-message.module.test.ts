import { expect, test } from "bun:test"
import {
  ACTION_BAR_PLAYER,
  ACTION_BAR_SENDER,
  CHAT_SENDER,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

test("the action bar and the chat each send under a name made from the player's", () => {
  expect(ACTION_BAR_SENDER.startsWith(`${ACTION_BAR_PLAYER}-`)).toBe(true)
  expect(CHAT_SENDER.startsWith(`${ACTION_BAR_PLAYER}-`)).toBe(true)
  expect(CHAT_SENDER).not.toBe(ACTION_BAR_SENDER)
})

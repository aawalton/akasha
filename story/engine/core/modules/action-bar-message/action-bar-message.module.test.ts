import { expect, test } from "bun:test"
import {
  ACTION_BAR_PLAYER,
  CHAT_SENDER,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

test("the chat sends under a name made from the player's", () => {
  expect(CHAT_SENDER.startsWith(`${ACTION_BAR_PLAYER}-`)).toBe(true)
  expect(CHAT_SENDER).not.toBe(ACTION_BAR_PLAYER)
})

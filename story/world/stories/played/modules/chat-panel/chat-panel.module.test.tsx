import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { fireEvent, render } from "@testing-library/react"
import {
  ChatPanel,
  emptySaid,
  linesOf,
} from "akasha/story/world/stories/played/modules/chat-panel/chat-panel.module.code.tsx"

const AT = "2026-10-27T19:00:00.000Z"

test("a line Alan said is his, and a line any seat said is the game master's", () => {
  const lines = linesOf(
    [
      { at: AT, from: "alan", body: "how far to dawn?" },
      { at: AT, from: "mari-roleplay-test-story", body: "two hours" },
    ],
    []
  )
  expect(lines.map((line) => [line.from, line.text, line.said])).toEqual([
    ["alan", "how far to dawn?", null],
    ["game-master", "two hours", null],
  ])
})

test("a message still sending or refused comes after every line the chat kept", () => {
  const lines = linesOf(
    [{ at: AT, from: "alan", body: "kept" }],
    [
      { key: "a", text: "sending", refused: null },
      { key: "b", text: "refused", refused: "the chat did not answer." },
    ]
  )
  expect(lines.map((line) => [line.text, line.said])).toEqual([
    ["kept", null],
    ["sending", "Sending…"],
    ["refused", "Not sent: the chat did not answer."],
  ])
})

test("the panel has one tab, Assistant, and says what to ask while empty", () => {
  const shown = render(<ChatPanel lines={[]} answerer="Mari" onSend={() => undefined} />)
  expect(shown.getByRole("radio", { name: "Assistant" })).toBeDefined()
  expect(shown.getByText(emptySaid("Mari"))).toBeDefined()
  shown.unmount()
})

test("the game master's answer is drawn in the tab", () => {
  const lines = linesOf([{ at: AT, from: "mari", body: "two hours" }], [])
  const shown = render(<ChatPanel lines={lines} answerer="Mari" onSend={() => undefined} />)
  expect(shown.getByText("two hours")).toBeDefined()
  shown.unmount()
})

test("Send sends what the box holds, though no keystroke announced it, and empties it", () => {
  const said: string[] = []
  const shown = render(
    <ChatPanel
      lines={[]}
      answerer="Mari"
      onSend={(text) => {
        said.push(text)
      }}
    />
  )
  const box = shown.getByLabelText("Message to Mari") as HTMLTextAreaElement
  box.value = " slow down "
  fireEvent.click(shown.getByLabelText("Send"))
  expect(said).toEqual(["slow down"])
  expect(box.value).toBe("")
  shown.unmount()
})

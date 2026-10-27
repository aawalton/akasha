import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { fireEvent, render } from "@testing-library/react"
import {
  bracketed,
  ChatPanel,
  chatLinesOf,
  emptySaid,
  unbracketed,
} from "akasha/story/world/stories/played/modules/chat-panel/chat-panel.module.code.tsx"

test("a chat message reaches the game master wrapped in brackets once", () => {
  expect([bracketed("slow down"), bracketed("[slow down]")]).toEqual(["[slow down]", "[slow down]"])
})

test("a message waiting is drawn without its brackets", () => {
  expect(unbracketed("  [slow down]  ")).toBe("slow down")
})

test("a message sent this visit says whether the game master has read it", () => {
  const sent = [
    { key: "a", text: "one", id: "m1", refused: null },
    { key: "b", text: "two", id: "m2", refused: null },
    { key: "c", text: "three", id: null, refused: null },
    { key: "d", text: "four", id: null, refused: "No game." },
  ]
  const pending = [{ id: "m2", text: "[two]", kind: "feedback" as const }]
  expect(chatLinesOf(sent, pending, "Mari").map((line) => line.said)).toEqual([
    "Read by Mari",
    "Waiting for Mari",
    "Sending…",
    "Not sent: No game.",
  ])
})

test("a message waiting from an earlier visit comes first, and an action waiting is no chat", () => {
  const pending = [
    { id: "m0", text: "[earlier]", kind: "feedback" as const },
    { id: "t1", text: "I draw the sword", kind: "action" as const },
  ]
  const sent = [{ key: "a", text: "now", id: null, refused: null }]
  expect(chatLinesOf(sent, pending, "Mari").map((line) => line.text)).toEqual(["earlier", "now"])
})

test("the panel has one tab, Assistant, and says what to ask while empty", () => {
  const shown = render(<ChatPanel lines={[]} answerer="Mari" onSend={() => undefined} />)
  expect(shown.getByRole("radio", { name: "Assistant" })).toBeDefined()
  expect(shown.getByText(emptySaid("Mari"))).toBeDefined()
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

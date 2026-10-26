import { expect, test } from "bun:test"
import { GlobalRegistrator } from "@happy-dom/global-registrator"
import {
  draftKept,
  draftKey,
  draftWith,
  draftWithout,
  dropDraftSent,
  enterSends,
  keepDraft,
  SeatComposer,
  type Shelf,
} from "akasha/agent/seat/modules/composer/seat-composer.module.code.tsx"

if (!("document" in globalThis)) GlobalRegistrator.register()

const { fireEvent, render } = await import("@testing-library/react")

const SEAT = "01a1505b-0000-7000-8000-000000000001"

const OTHER_SEAT = "01a1505b-0000-7000-8000-000000000002"

function shelfOf(): Shelf & { readonly held: Map<string, string> } {
  const held = new Map<string, string>()
  return {
    held,
    getItem: (key) => held.get(key) ?? null,
    setItem: (key, value) => {
      held.set(key, value)
    },
    removeItem: (key) => {
      held.delete(key)
    },
  }
}

const REFUSING: Shelf = {
  getItem: () => {
    throw new Error("refused")
  },
  setItem: () => {
    throw new Error("full")
  },
  removeItem: () => {
    throw new Error("refused")
  },
}

const ENTER_KEY_CODE = 13

function enter(shiftKey: boolean) {
  return { key: "Enter", shiftKey, nativeEvent: { isComposing: false, keyCode: ENTER_KEY_CODE } }
}

test("Enter on a keyboard with a fine pointer sends, and Shift with Enter does not", () => {
  expect(enterSends(enter(false), false)).toBe(true)
  expect(enterSends(enter(true), false)).toBe(false)
})

test("Return on a touch screen starts a new line rather than sending", () => {
  expect(enterSends(enter(false), true)).toBe(false)
  expect(enterSends(enter(true), true)).toBe(false)
})

test("a draft is kept apart for each seat and each person", () => {
  const keys = new Set([
    draftKey(SEAT, "alan"),
    draftKey(SEAT, "jenny"),
    draftKey(OTHER_SEAT, "alan"),
    draftKey(SEAT, null),
  ])
  expect(keys.size).toBe(4)
})

test("a draft typed is read back as typed", () => {
  const shelf = shelfOf()
  const key = draftKey(SEAT, "alan")
  keepDraft(shelf, key, "half a thought\nand a second line ")
  expect(draftKept(shelf, key)).toBe("half a thought\nand a second line ")
})

test("a draft emptied keeps nothing", () => {
  const shelf = shelfOf()
  const key = draftKey(SEAT, "alan")
  keepDraft(shelf, key, "words")
  keepDraft(shelf, key, "  ")
  expect(shelf.held.size).toBe(0)
  expect(draftKept(shelf, key)).toBe("")
})

test("a draft sent and confirmed is dropped", () => {
  const shelf = shelfOf()
  const key = draftKey(SEAT, "alan")
  keepDraft(shelf, key, "  send this ")
  dropDraftSent(shelf, key, "send this")
  expect(draftKept(shelf, key)).toBe("")
})

test("a draft typed after the send went is kept when the send is confirmed", () => {
  const shelf = shelfOf()
  const key = draftKey(SEAT, "alan")
  keepDraft(shelf, key, "the next message")
  dropDraftSent(shelf, key, "send this")
  expect(draftKept(shelf, key)).toBe("the next message")
})

test("a message taken back fills an empty composer", () => {
  expect(draftWith("  ", "what I said")).toBe("what I said")
})

test("a message taken back goes before what is being written, a blank line between", () => {
  expect(draftWith("a new thought", "what I said")).toBe("what I said\n\na new thought")
})

test("an image handed back with no words leaves what is being written as it is", () => {
  expect(draftWith("a new thought", "")).toBe("a new thought")
})

test("words handed back and then refused leave the box as it was before them", () => {
  const merged = draftWith("a new thought", "what I said")
  expect(draftWithout(merged, merged, "a new thought")).toBe("a new thought")
})

test("words handed back and then edited are kept when the cancel is refused", () => {
  const merged = draftWith("", "what I said")
  expect(draftWithout(`${merged} and more`, merged, "")).toBe("what I said and more")
})

test("a store that refuses keeps nothing and throws nothing", () => {
  const key = draftKey(SEAT, "alan")
  expect(() => keepDraft(REFUSING, key, "words")).not.toThrow()
  expect(draftKept(REFUSING, key)).toBe("")
  expect(draftKept(null, key)).toBe("")
})

function boxIn(shown: ReturnType<typeof render>): HTMLTextAreaElement {
  return shown.getByLabelText("Message to this seat") as HTMLTextAreaElement
}

test("words the phone put in the box unannounced, as dictation can, outlive the page drawing again", () => {
  const shown = render(<SeatComposer seat={SEAT} onSend={async () => true} />)
  const box = boxIn(shown)
  box.value = "words spoken into the box"
  shown.rerender(<SeatComposer seat={SEAT} onSend={async () => false} />)
  expect(boxIn(shown).value).toBe("words spoken into the box")
  shown.unmount()
})

test("the send button sends what the box holds, though no keystroke announced it", () => {
  const sent: string[] = []
  const shown = render(
    <SeatComposer
      seat={OTHER_SEAT}
      onSend={async (text) => {
        sent.push(text)
        return false
      }}
    />
  )
  fireEvent.change(boxIn(shown), { target: { value: "typed" } })
  boxIn(shown).value = "typed, then spoken"
  fireEvent.click(shown.getByLabelText("Send"))
  expect(sent).toEqual(["typed, then spoken"])
  expect(boxIn(shown).value).toBe("")
  shown.unmount()
})

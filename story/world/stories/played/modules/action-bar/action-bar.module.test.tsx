import { expect, test } from "bun:test"
import { GlobalRegistrator } from "@happy-dom/global-registrator"
import { COMPOSER_LINE_TEXT } from "akasha/agent/seat/modules/composer-box/composer-box.module.code.tsx"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { ActionBar } from "akasha/story/world/stories/played/modules/action-bar/action-bar.module.code.tsx"

if (!("document" in globalThis)) GlobalRegistrator.register()

const { fireEvent, render } = await import("@testing-library/react")

function drawn() {
  return render(
    <UserIdContext.Provider value="user-one">
      <ActionBar
        beside="none"
        externalId={undefined}
        storyTitle="Gifted"
        turnsSeen={0}
        lastTurn={null}
        making={null}
      />
    </UserIdContext.Provider>
  )
}

test("the line is one line tall, with its round send button beside it", () => {
  const shown = drawn()
  const box = shown.getByLabelText("Your action") as HTMLTextAreaElement
  expect(box.className).toContain(COMPOSER_LINE_TEXT)
  expect(box.className).toContain("field-sizing-content")
  expect(box.parentElement?.className).toContain("items-end")
  expect(box.parentElement?.className).toContain("rounded-[1.25rem]")
  expect(box.nextElementSibling?.getAttribute("aria-label")).toBe("Send")
  shown.unmount()
})

test("the send button stays disabled until the line holds text", () => {
  const shown = drawn()
  const send = shown.getByLabelText("Send") as HTMLButtonElement
  expect(send.disabled).toBe(true)
  fireEvent.change(shown.getByLabelText("Your action"), { target: { value: "I wait" } })
  expect(send.disabled).toBe(false)
  shown.unmount()
})

import { afterEach, describe, expect, mock, test } from "bun:test"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ClientPendingAction } from "../lib/client-envelope"
import type { PlayerActionResult } from "../lib/submit-player-action"

const real = await import("../lib/submit-player-action")

const submitCalls: string[] = []
let submitBehavior: (text: string) => Promise<PlayerActionResult> = async () => ({ ok: true })

mock.module("../lib/submit-player-action", () => ({
  PlayerActionInputSchema: real.PlayerActionInputSchema,
  submitPlayerAction: (input: { text: string }): Promise<PlayerActionResult> => {
    submitCalls.push(input.text)
    return submitBehavior(input.text)
  },
}))

const { useActionBox, ActionRows, ActionComposer } = await import("./action-box")

function ActionBox({
  gameExternalId,
  pendingActions,
}: {
  gameExternalId: string
  pendingActions: readonly ClientPendingAction[]
}) {
  const state = useActionBox({ gameExternalId, pendingActions })
  return (
    <>
      <ActionRows pendingActions={state.pendingActions} visibleEchoes={state.visibleEchoes} />
      <ActionComposer state={state} />
    </>
  )
}

function pending(
  text: string,
  submittedAt: number,
  kind: ClientPendingAction["kind"] = "action"
): ClientPendingAction {
  return { text, submittedAt, kind }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((r) => {
    resolve = r
  })
  return { promise, resolve }
}

function typeAction(value: string) {
  const input = screen.getByLabelText("Your action")
  fireEvent.change(input, { target: { value } })
}

async function submitAction() {
  const form = screen.getByLabelText("Your action").closest("form")
  if (form === null) throw new Error("form missing")
  await act(async () => {
    fireEvent.submit(form)
  })
}

afterEach(() => {
  cleanup()
  submitCalls.length = 0
  submitBehavior = async () => ({ ok: true })
})

describe("ActionBox — server-derived pending actions (#14522)", () => {
  test("pending actions from the envelope render immediately (survive a refresh)", () => {
    render(
      <ActionBox
        gameExternalId="game-1"
        pendingActions={[pending("look around", 100), pending("open the door", 200)]}
      />
    )
    expect(screen.getByText("look around")).not.toBeNull()
    expect(screen.getByText("open the door")).not.toBeNull()
    expect(submitCalls).toEqual([])
  })

  test("a response landing (pendingActions empties on the next poll) clears the rows", () => {
    const { rerender } = render(
      <ActionBox gameExternalId="game-1" pendingActions={[pending("look around", 100)]} />
    )
    expect(screen.getByText("look around")).not.toBeNull()
    rerender(<ActionBox gameExternalId="game-1" pendingActions={[]} />)
    expect(screen.queryByText("look around")).toBeNull()
  })
})

describe("ActionBox — optimistic echo bridge (#14444, #15334)", () => {
  test("echo text renders on submit and persists after the ack — no status chrome", async () => {
    const d = deferred<PlayerActionResult>()
    submitBehavior = () => d.promise
    render(<ActionBox gameExternalId="game-1" pendingActions={[]} />)

    typeAction("look around")
    await submitAction()

    expect(screen.getByText("look around")).not.toBeNull()
    expect(screen.queryByText("sending")).toBeNull()
    expect(screen.queryByText("received")).toBeNull()

    await act(async () => {
      d.resolve({ ok: true })
    })
    expect(screen.getByText("look around")).not.toBeNull()
    expect(screen.queryByText("received")).toBeNull()
    expect(submitCalls).toEqual(["look around"])
  })

  test("a failed ack rolls the optimistic echo back and surfaces the error", async () => {
    submitBehavior = async () => ({ ok: false, error: "The game did not respond. Try again." })
    render(<ActionBox gameExternalId="game-1" pendingActions={[]} />)

    typeAction("open the door")
    await submitAction()

    expect(screen.queryByText("open the door")).toBeNull()
    expect(screen.getByText(/did not respond/)).not.toBeNull()
  })
})

describe("ActionBox — echo → server handoff (#14522)", () => {
  test("once a poll returns the action, the server row renders it and the echo clears — no double render", async () => {
    const { rerender } = render(<ActionBox gameExternalId="game-1" pendingActions={[]} />)

    typeAction("look around")
    await submitAction()
    expect(screen.getAllByText("look around")).toHaveLength(1)

    await act(async () => {
      rerender(<ActionBox gameExternalId="game-1" pendingActions={[pending("look around", 100)]} />)
    })
    expect(screen.getAllByText("look around")).toHaveLength(1)

    await act(async () => {
      rerender(<ActionBox gameExternalId="game-1" pendingActions={[]} />)
    })
    expect(screen.queryByText("look around")).toBeNull()
  })
})

describe("ActionBox — out-of-character feedback label (#14583)", () => {
  test("a feedback-kind server row shows the muted 'feedback' label; an action row does not", () => {
    render(
      <ActionBox
        gameExternalId="game-1"
        pendingActions={[
          pending("draw my sword", 100, "action"),
          pending("[slow the pacing down]", 200, "feedback"),
        ]}
      />
    )
    expect(screen.getByText("draw my sword")).not.toBeNull()
    expect(screen.getByText("[slow the pacing down]")).not.toBeNull()
    expect(screen.getAllByText("feedback")).toHaveLength(1)
  })

  test("no feedback label when every pending item is an action", () => {
    render(
      <ActionBox gameExternalId="game-1" pendingActions={[pending("look around", 100, "action")]} />
    )
    expect(screen.queryByText("feedback")).toBeNull()
  })

  test("an optimistic echo of a bracketed message shows the feedback label immediately", async () => {
    render(<ActionBox gameExternalId="game-1" pendingActions={[]} />)
    typeAction("[this is meta, not an action]")
    await submitAction()
    expect(screen.getByText("[this is meta, not an action]")).not.toBeNull()
    expect(screen.getByText("feedback")).not.toBeNull()
  })
})

describe("ActionBox — identical-resend soft-guard (#14444 + #14522)", () => {
  test("resending an un-responded identical echo arms a confirm instead of sending", async () => {
    render(<ActionBox gameExternalId="game-1" pendingActions={[]} />)

    typeAction("draw my sword")
    await submitAction()
    expect(submitCalls).toEqual(["draw my sword"])

    typeAction("draw my sword")
    await submitAction()
    expect(submitCalls).toEqual(["draw my sword"])
    expect(screen.getByText(/already sent this/)).not.toBeNull()

    await submitAction()
    expect(submitCalls).toEqual(["draw my sword", "draw my sword"])
    expect(screen.queryByText(/already sent this/)).toBeNull()
  })

  test("the guard keys on SERVER pending too — a resend after refresh is guarded with no local echo", async () => {
    render(<ActionBox gameExternalId="game-1" pendingActions={[pending("cast fireball", 100)]} />)

    typeAction("cast fireball")
    await submitAction()
    expect(submitCalls).toEqual([])
    expect(screen.getByText(/already sent this/)).not.toBeNull()

    await submitAction()
    expect(submitCalls).toEqual(["cast fireball"])
  })

  test("editing the text away from the armed value disarms the confirm", async () => {
    render(<ActionBox gameExternalId="game-1" pendingActions={[]} />)

    typeAction("wait quietly")
    await submitAction()
    typeAction("wait quietly")
    await submitAction()
    expect(screen.getByText(/already sent this/)).not.toBeNull()

    typeAction("wait quietly and listen")
    expect(screen.queryByText(/already sent this/)).toBeNull()
    expect(submitCalls).toEqual(["wait quietly"])
  })
})

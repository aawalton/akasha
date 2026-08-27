import { afterEach, describe, expect, test } from "bun:test"
import { act, cleanup, fireEvent } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { AuthPageContent } from "./auth-page-content"

afterEach(() => {
  cleanup()
})

const noop = async () => undefined

function submit(container: HTMLElement) {
  const form = container.querySelector('form[data-slot="auth-form"]')
  if (form == null) throw new Error("auth form not found")
  return act(async () => {
    fireEvent.submit(form)
  })
}

function fill(container: HTMLElement, selector: string, value: string) {
  const input = container.querySelector<HTMLInputElement>(selector)
  if (input == null) throw new Error(`${selector} not found`)
  fireEvent.change(input, { target: { value } })
  return input
}

describe("AuthPageContent — browser-test-harness DOM contract", () => {
  test("sign-in exposes the selectors launchAndSignIn drives", () => {
    const { container } = render(<AuthPageContent mode="sign-in" onSubmit={noop} />)

    expect(container.querySelector("input#email")).not.toBeNull()
    expect(container.querySelector("input#password")).not.toBeNull()
    expect(container.querySelector('form[data-slot="auth-form"]')).not.toBeNull()
    expect(
      container.querySelectorAll('form[data-slot="auth-form"] button[type="submit"]')
    ).toHaveLength(1)
  })

  test("email and password stay controlled inputs", () => {
    const { container } = render(<AuthPageContent mode="sign-in" onSubmit={noop} />)

    expect(fill(container, "input#email", "david@example.com").value).toBe("david@example.com")
    expect(fill(container, "input#password", "hunter2000").value).toBe("hunter2000")
  })

  test("sign-up adds no second submit button", () => {
    const { container } = render(<AuthPageContent mode="sign-up" onSubmit={noop} />)

    expect(
      container.querySelectorAll('form[data-slot="auth-form"] button[type="submit"]')
    ).toHaveLength(1)
  })
})

describe("AuthPageContent — password recovery", () => {
  test("omitting recoveryNotice renders no recovery affordance", () => {
    const { container } = render(<AuthPageContent mode="sign-in" onSubmit={noop} />)

    expect(container.querySelector('[aria-controls="password-recovery"]')).toBeNull()
    expect(container.querySelector("#password-recovery")).toBeNull()
  })

  test("the notice is disclosed on demand, not shown by default", () => {
    const { container } = render(
      <AuthPageContent mode="sign-in" onSubmit={noop} recoveryNotice={<p>reset by hand</p>} />
    )

    const trigger = container.querySelector<HTMLButtonElement>(
      '[aria-controls="password-recovery"]'
    )
    if (trigger == null) throw new Error("recovery trigger not found")
    expect(trigger.type).toBe("button")
    expect(trigger.getAttribute("aria-expanded")).toBe("false")
    expect(container.querySelector("#password-recovery")).toBeNull()

    act(() => {
      fireEvent.click(trigger)
    })

    expect(trigger.getAttribute("aria-expanded")).toBe("true")
    expect(container.querySelector("#password-recovery")?.textContent).toContain("reset by hand")
  })

  test("a rejected sign-in surfaces the notice without a second click", async () => {
    const { container } = render(
      <AuthPageContent
        mode="sign-in"
        onSubmit={async () => ({ error: "Invalid login credentials" })}
        recoveryNotice={<p>reset by hand</p>}
      />
    )

    expect(container.querySelector("#password-recovery")).toBeNull()
    await submit(container)

    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Invalid login credentials"
    )
    expect(container.querySelector("#password-recovery")?.textContent).toContain("reset by hand")
  })

  test("sign-up shows no recovery affordance", () => {
    const { container } = render(
      <AuthPageContent mode="sign-up" onSubmit={noop} recoveryNotice={<p>reset by hand</p>} />
    )

    expect(container.querySelector('[aria-controls="password-recovery"]')).toBeNull()
  })
})

describe("AuthPageContent — sign-up password rules", () => {
  test("the length rule is stated before submitting", () => {
    const { container } = render(<AuthPageContent mode="sign-up" onSubmit={noop} />)

    expect(container.textContent).toContain("At least 8 characters")
  })

  test("a short password is rejected without reaching onSubmit", async () => {
    let calls = 0
    const { container } = render(
      <AuthPageContent
        mode="sign-up"
        onSubmit={async () => {
          calls += 1
          return undefined
        }}
      />
    )

    fill(container, "input#password", "abc")
    fill(container, "input#confirm-password", "abc")
    await submit(container)

    expect(calls).toBe(0)
    expect(container.querySelector('[role="alert"]')?.textContent).toContain("at least 8")
  })

  test("a mistyped confirmation is rejected without reaching onSubmit", async () => {
    let calls = 0
    const { container } = render(
      <AuthPageContent
        mode="sign-up"
        onSubmit={async () => {
          calls += 1
          return undefined
        }}
      />
    )

    fill(container, "input#password", "correct horse")
    fill(container, "input#confirm-password", "correct hose")
    await submit(container)

    expect(calls).toBe(0)
    expect(container.querySelector('[role="alert"]')?.textContent).toContain("do not match")
  })

  test("a matching password of legal length reaches onSubmit", async () => {
    const seen: string[] = []
    const { container } = render(
      <AuthPageContent
        mode="sign-up"
        onSubmit={async (payload) => {
          seen.push(payload.password)
          return undefined
        }}
      />
    )

    fill(container, "input#password", "correct horse")
    fill(container, "input#confirm-password", "correct horse")
    await submit(container)

    expect(seen).toEqual(["correct horse"])
  })

  test("sign-in asks for no confirmation field", () => {
    const { container } = render(<AuthPageContent mode="sign-in" onSubmit={noop} />)

    expect(container.querySelector("input#confirm-password")).toBeNull()
    expect(container.textContent).not.toContain("At least 8 characters")
  })
})

describe("AuthPageContent — notice channel", () => {
  test("a returned notice replaces the form so it cannot be re-submitted", async () => {
    const { container } = render(
      <AuthPageContent
        mode="sign-up"
        onSubmit={async () => ({ notice: <p>Confirm your email to finish</p> })}
      />
    )

    fill(container, "input#password", "correct horse")
    fill(container, "input#confirm-password", "correct horse")
    await submit(container)

    expect(container.querySelector('[data-slot="auth-notice"]')?.textContent).toContain(
      "Confirm your email to finish"
    )
    expect(container.querySelector('form[data-slot="auth-form"]')).toBeNull()
  })
})

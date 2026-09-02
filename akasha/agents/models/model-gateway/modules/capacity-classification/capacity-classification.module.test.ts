import { expect, test } from "bun:test"
import {
  type Capacity429Class,
  classifyCapacity429,
  FAST_MODE_CREDITS_MESSAGE,
  FIVE_HOUR_STATUS_HEADER,
  OVERAGE_DISABLED_REASON_HEADER,
  OVERAGE_STATUS_HEADER,
  SEVEN_DAY_STATUS_HEADER,
  STATUS_ALLOWED,
  STATUS_REJECTED,
} from "./capacity-classification.module.code.ts"

const headersOf = (entries: Record<string, string>): Headers => new Headers(entries)

function notCapacity(
  result: Capacity429Class
): Extract<Capacity429Class, { kind: "not-capacity" }> {
  if (result.kind !== "not-capacity") {
    throw new Error(`the class was ${result.kind} rather than not-capacity`)
  }
  return result
}

test("a window status present and other than allowed is capacity", () => {
  const fiveHourSpent = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: STATUS_REJECTED,
      [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
    }),
    null
  )
  expect(fiveHourSpent).toEqual({ kind: "capacity", reason: "5h=rejected 7d=allowed" })

  const sevenDaySpent = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
      [SEVEN_DAY_STATUS_HEADER]: "queueing",
    }),
    null
  )
  expect(sevenDaySpent).toEqual({ kind: "capacity", reason: "5h=allowed 7d=queueing" })
})

test("both window statuses allowed is not capacity", () => {
  const result = notCapacity(
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
        [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
      }),
      null
    )
  )
  expect(result.signal).toBe("windows-allowed")
  expect(result.overageRejected).toBe(false)
  expect(result.overageDisabledReason).toBe(null)
  expect(result.reason).toBe("5h=allowed 7d=allowed overage=absent")
})

test("a rejected overage under allowed windows is not capacity", () => {
  const result = notCapacity(
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
        [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
        [OVERAGE_STATUS_HEADER]: STATUS_REJECTED,
        [OVERAGE_DISABLED_REASON_HEADER]: "admin_disabled",
      }),
      null
    )
  )
  expect(result.signal).toBe("windows-allowed")
  expect(result.overageRejected).toBe(true)
  expect(result.overageDisabledReason).toBe("admin_disabled")
  expect(result.reason).toBe("5h=allowed 7d=allowed overage=rejected (admin_disabled)")
})

test("both window headers absent with an overage disabled reason is not capacity", () => {
  const result = notCapacity(
    classifyCapacity429(headersOf({ [OVERAGE_DISABLED_REASON_HEADER]: "admin_disabled" }), null)
  )
  expect(result.signal).toBe("overage-header")
  expect(result.overageRejected).toBe(true)
  expect(result.overageDisabledReason).toBe("admin_disabled")
  expect(result.reason).toContain(`${OVERAGE_DISABLED_REASON_HEADER}=admin_disabled`)
})

test("both window headers absent with a body naming fast-mode credits is not capacity", () => {
  const result = notCapacity(
    classifyCapacity429(headersOf({}), `{"error":{"message":"${FAST_MODE_CREDITS_MESSAGE}"}}`)
  )
  expect(result.signal).toBe("overage-body")
  expect(result.overageRejected).toBe(true)
  expect(result.overageDisabledReason).toBe(null)
  expect(result.reason).toContain("body names fast-mode credits")
})

test("a window status header absent leaves the 429 unclassified", () => {
  const result = classifyCapacity429(headersOf({}), null)
  expect(result.kind).toBe("unclassified")
})

test("one window header present and one absent is unclassified whatever the overage headers hold", () => {
  const result = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
      [OVERAGE_STATUS_HEADER]: STATUS_REJECTED,
      [OVERAGE_DISABLED_REASON_HEADER]: "admin_disabled",
    }),
    `{"error":{"message":"${FAST_MODE_CREDITS_MESSAGE}"}}`
  )
  expect(result).toEqual({
    kind: "unclassified",
    reason: `window status header(s) absent: ${SEVEN_DAY_STATUS_HEADER}`,
  })
})

test("the body is read only where both window headers are absent", () => {
  const oneWindowPresent = classifyCapacity429(
    headersOf({ [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED }),
    FAST_MODE_CREDITS_MESSAGE
  )
  expect(oneWindowPresent.kind).toBe("unclassified")

  const bothWindowsPresent = notCapacity(
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
        [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
      }),
      FAST_MODE_CREDITS_MESSAGE
    )
  )
  expect(bothWindowsPresent.signal).toBe("windows-allowed")
})

test("a header value is read with case folded away", () => {
  const result = notCapacity(
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: "ALLOWED",
        [SEVEN_DAY_STATUS_HEADER]: "Allowed",
        [OVERAGE_STATUS_HEADER]: "REJECTED",
      }),
      null
    )
  )
  expect(result.signal).toBe("windows-allowed")
  expect(result.overageRejected).toBe(true)
  expect(result.reason).toBe("5h=allowed 7d=allowed overage=rejected")
})

test("a header value that is blank is read as absent", () => {
  const result = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: "   ",
      [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
    }),
    null
  )
  expect(result).toEqual({
    kind: "unclassified",
    reason: `window status header(s) absent: ${FIVE_HOUR_STATUS_HEADER}`,
  })
})

test("an unclassified 429 names the window headers that were absent", () => {
  const result = classifyCapacity429(headersOf({}), "nothing an overage is named in")
  expect(result).toEqual({
    kind: "unclassified",
    reason: `window status header(s) absent: ${FIVE_HOUR_STATUS_HEADER}, ${SEVEN_DAY_STATUS_HEADER}`,
  })
})

test("every class carries a reason naming what the headers said", () => {
  const classes = [
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: STATUS_REJECTED,
        [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
      }),
      null
    ),
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
        [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
      }),
      null
    ),
    classifyCapacity429(headersOf({}), null),
  ]
  for (const oneClass of classes) expect(oneClass.reason.length).toBeGreaterThan(0)
})

test("the body is matched for fast-mode credits by substring rather than by a parse", () => {
  const buried = notCapacity(
    classifyCapacity429(
      headersOf({}),
      `<html>429 — Usage Credits Are Required For Fast Mode, said the edge</html>`
    )
  )
  expect(buried.signal).toBe("overage-body")

  const worded = classifyCapacity429(headersOf({}), "fast mode requires usage credits")
  expect(worded.kind).toBe("unclassified")
})

test("nothing here decides what to do about a 429", () => {
  const capacity = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: STATUS_REJECTED,
      [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
    }),
    null
  )
  expect(Object.keys(capacity)).toEqual(["kind", "reason"])

  const allowed = notCapacity(
    classifyCapacity429(
      headersOf({
        [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
        [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
      }),
      null
    )
  )
  expect(Object.keys(allowed)).toEqual([
    "kind",
    "signal",
    "overageRejected",
    "overageDisabledReason",
    "reason",
  ])
})

test("nothing here reads the account or the model the 429 came from", () => {
  const bare = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
      [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
    }),
    null
  )
  const dressed = classifyCapacity429(
    headersOf({
      [FIVE_HOUR_STATUS_HEADER]: STATUS_ALLOWED,
      [SEVEN_DAY_STATUS_HEADER]: STATUS_ALLOWED,
      "anthropic-account": "second-seat",
      "request-id": "req_0123456789",
    }),
    `{"model":"claude-opus-4-6","error":{"type":"rate_limit_error"}}`
  )
  expect(dressed).toEqual(bare)
})

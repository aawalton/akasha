import { describe, expect, test } from "bun:test"
import {
  hashOf,
  movementIn,
} from "akasha/product/kofi/stripe/modules/movement/movement.module.code.ts"

function succeeded(charge: Readonly<Record<string, unknown>>): unknown {
  return { id: "evt_1", type: "charge.succeeded", data: { object: charge } }
}

function refunded(charge: Readonly<Record<string, unknown>>): unknown {
  return { id: "evt_2", type: "charge.refunded", data: { object: charge } }
}

describe("movementIn", () => {
  test("earns a point for every cent a charge took", () => {
    const read = movementIn(
      succeeded({ id: "ch_1", amount: 500, billing_details: { email: "Alan@Example.com" } })
    )
    expect(read).toEqual({
      movement: { chargeId: "ch_1", email: "alan@example.com", points: 500 },
    })
  })

  test("falls back to the address a receipt went to", () => {
    const read = movementIn(
      succeeded({ id: "ch_2", amount: 100, billing_details: {}, receipt_email: "B@C.com" })
    )
    expect(read).toEqual({ movement: { chargeId: "ch_2", email: "b@c.com", points: 100 } })
  })

  test("takes back what a refund returned rather than what the charge took", () => {
    const read = movementIn(
      refunded({
        id: "ch_3",
        amount: 500,
        amount_refunded: 200,
        billing_details: { email: "a@b.com" },
      })
    )
    expect(read).toEqual({ movement: { chargeId: "ch_3", email: "a@b.com", points: -200 } })
  })

  test("passes over an event of another kind", () => {
    const read = movementIn({ id: "evt_3", type: "charge.dispute.created", data: { object: {} } })
    expect(read).toEqual({ passedOver: "`charge.dispute.created` moves no points" })
  })

  test("passes over a charge naming no address", () => {
    const read = movementIn(succeeded({ id: "ch_4", amount: 500, billing_details: {} }))
    expect(read).toEqual({ passedOver: "`ch_4` names no address" })
  })

  test("passes over a charge that took nothing", () => {
    const read = movementIn(
      succeeded({ id: "ch_5", amount: 0, billing_details: { email: "a@b.com" } })
    )
    expect(read).toEqual({ passedOver: "`ch_5` is for nothing" })
  })

  test("passes over a refund that returned nothing", () => {
    const read = movementIn(
      refunded({ id: "ch_6", amount_refunded: 0, billing_details: { email: "a@b.com" } })
    )
    expect(read).toEqual({ passedOver: "`ch_6` refunded nothing" })
  })

  test("passes over an amount that is no whole number of cents", () => {
    const read = movementIn(
      succeeded({ id: "ch_7", amount: 1.5, billing_details: { email: "a@b.com" } })
    )
    expect(read).toEqual({ passedOver: "`ch_7` states no amount" })
  })

  test("passes over a body that is no object", () => {
    expect(movementIn("charge.succeeded")).toEqual({ passedOver: "the body is no object" })
  })

  test("passes over a body naming no event type", () => {
    expect(movementIn({ data: { object: {} } })).toEqual({
      passedOver: "the body names no event type",
    })
  })

  test("passes over an event carrying no charge", () => {
    expect(movementIn({ type: "charge.succeeded" })).toEqual({
      passedOver: "`charge.succeeded` carries no charge",
    })
  })
})

describe("hashOf", () => {
  test("answers the sha-256 of an address as lower hex", async () => {
    expect(await hashOf("alan@example.com")).toBe(
      "61356ceff7537431960452071a97f980415f71b0ce1ab92da45f5b5a41277d26"
    )
  })
})

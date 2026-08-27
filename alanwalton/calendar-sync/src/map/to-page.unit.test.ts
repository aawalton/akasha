import { describe, expect, test } from "bun:test"
import { caldataEventSchema } from "../communico/schema"
import { caldataEventToPageProps, type MapContext } from "./to-page"

const CTX: MapContext = {
  timeZone: ["America", "Denver"].join("/"),
  providerClient: "provolibrary",
  nowMs: 1_780_000_000_000,
}

const ALL_DAY = caldataEventSchema.parse({
  id: "16254957",
  title: "Story Trail",
  sub_title: "Library Grounds #1",
  description: "A new story trail.",
  long_description: "",
  raw_start_time: "2026-06-06 00:00:00",
  raw_end_time: "2026-06-06 23:59:00",
  time_string: "All day",
  location: "Provo Library",
  venues: "Front Lawn",
  image: "Story-Trails-square.jpg",
  url: "https://provolibrary.gov//event/16254957",
  allow_reg: "0",
  reg_opens: "0000-00-00 00:00:00",
  reg_url: "",
  max_attendee: "0",
  agesArray: ["Adults", "Teens (12-18)"],
  tagsArray: ["Family", "Bookish"],
  search_tagsArray: ["Kid-Friendly"],
})

const TIMED_REG = caldataEventSchema.parse({
  id: "16300000",
  title: "Coding Class",
  raw_start_time: "2026-06-06 09:00:00",
  raw_end_time: "2026-06-06 14:00:00",
  time_string: "9:00am - 2:00pm",
  location: "Provo Library",
  allow_reg: "1",
  reg_opens: "2026-05-06 10:00:00",
  reg_url: "https://provolibrary.gov/register/16300000",
  max_attendee: "12",
  agesArray: ["Adults"],
})

describe("caldataEventToPageProps", () => {
  test("all-day event maps facets, instants, and image url", () => {
    const props = caldataEventToPageProps(ALL_DAY, CTX)
    expect(props.title).toBe("Story Trail — Library Grounds #1")
    expect(props.slug).toBe("16254957")
    expect(props["external-id"]).toBe("16254957")
    expect(props["all-day"]).toBe(true)
    expect(props["registration-required"]).toBe(false)
    expect(props["age-groups"]).toEqual(["Adults", "Teens (12-18)"])
    expect(props["event-types"]).toEqual(["Family", "Bookish"])
    expect(props.tags).toEqual(["Kid-Friendly"])
    expect(props.location).toBe("Provo Library — Front Lawn")
    expect(props["image-url"]).toBe(
      "https://provolibrary.libnet.info/images/events/provolibrary/Story-Trails-square.jpg"
    )
    expect(props["external-link"]).toBe("https://provolibrary.gov//event/16254957")
    expect(props["last-synced-at"]).toBe(new Date(CTX.nowMs).toISOString())
    expect(props["start-at"]).toBe(new Date(Date.UTC(2026, 5, 6, 6, 0, 0)).toISOString())
  })

  test("no row carries the raw payload, the source relation, or a duplicate url", () => {
    const props = caldataEventToPageProps(ALL_DAY, CTX)
    expect("data" in props).toBe(false)
    expect("source" in props).toBe(false)
    expect("url" in props).toBe(false)
    expect("userId" in props).toBe(false)
  })

  test("all-day event omits registration + numeric fields that are zero/empty", () => {
    const props = caldataEventToPageProps(ALL_DAY, CTX)
    expect("registration-url" in props).toBe(false)
    expect("registration-opens-at" in props).toBe(false)
    expect("max-attendees" in props).toBe(false)
  })

  test("timed registration event maps reg fields and max attendees", () => {
    const props = caldataEventToPageProps(TIMED_REG, CTX)
    expect(props["registration-required"]).toBe(true)
    expect(props["registration-url"]).toBe("https://provolibrary.gov/register/16300000")
    expect(props["registration-opens-at"]).toBe(
      new Date(Date.UTC(2026, 4, 6, 16, 0, 0)).toISOString()
    )
    expect(props["max-attendees"]).toBe(12)
    expect(props["all-day"]).toBe(false)
    expect(props["start-at"]).toBe(new Date(Date.UTC(2026, 5, 6, 15, 0, 0)).toISOString())
    expect(props["end-at"]).toBe(new Date(Date.UTC(2026, 5, 6, 20, 0, 0)).toISOString())
  })

  test("missing facet arrays default to empty arrays", () => {
    const props = caldataEventToPageProps(TIMED_REG, CTX)
    expect(props["event-types"]).toEqual([])
    expect(props.tags).toEqual([])
  })
})

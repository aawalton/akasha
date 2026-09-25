import { expect, test } from "bun:test"
import { slidesFrom } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/modules/reading/slide-reading.module.code.ts"

test("slides are shown in the order of their numbers", () => {
  const slides = slidesFrom([
    { slug: "second", title: "Second", number: 1, kind: "agenda" },
    { slug: "first", title: "First", number: 0, kind: "title", lead: "Lead" },
  ])
  expect(slides.map((one) => one.title)).toEqual(["First", "Second"])
  expect(slides[0]?.lead).toBe("Lead")
})

test("a slide of no known kind is not shown", () => {
  expect(slidesFrom([{ slug: "odd", number: 0, kind: "odd" }])).toEqual([])
})

test("a point keeps the color, fill and icon it names from the known sets", () => {
  const [one] = slidesFrom([
    {
      slug: "bars",
      title: "Bars",
      number: 0,
      kind: "level",
      points: [
        { title: "Health", color: "red", fill: 0.7, icon: "brain" },
        { title: "Odd", color: "purple", icon: "star" },
        { value: "no title" },
      ],
    },
  ])
  expect(one?.points).toEqual([
    { title: "Health", value: null, description: null, color: "red", fill: 0.7, icon: "brain" },
    { title: "Odd", value: null, description: null, color: null, fill: null, icon: null },
  ])
})

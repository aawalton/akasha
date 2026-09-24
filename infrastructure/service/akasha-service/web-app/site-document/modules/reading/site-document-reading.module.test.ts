import { expect, test } from "bun:test"
import { drawnFrom } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"

test("a site document is drawn from its title, lead and sections in order", () => {
  const drawn = drawnFrom({
    slug: "terms",
    title: "Terms",
    description: "What the terms are.",
    lead: "The lead.",
    sections: [
      { anchor: "who", title: "Who", text: "Us." },
      { anchor: "what", title: "What", lead: "Texts.", text: "Messages." },
    ],
  })
  expect(drawn).toEqual({
    title: "Terms",
    description: "What the terms are.",
    lead: "The lead.",
    sections: [
      { anchor: "who", title: "Who", lead: null, text: "Us." },
      { anchor: "what", title: "What", lead: "Texts.", text: "Messages." },
    ],
  })
})

test("a section naming no anchor is not drawn", () => {
  const drawn = drawnFrom({ slug: "terms", sections: [{ title: "Who" }] })
  expect(drawn.sections).toEqual([])
  expect(drawn.title).toBe("terms")
})

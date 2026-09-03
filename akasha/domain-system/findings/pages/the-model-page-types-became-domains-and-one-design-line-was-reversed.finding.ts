import type { Finding } from "../finding.page-type.ts"

export const theModelPageTypesBecameDomainsAndOneDesignLineWasReversed = {
  id: "01a0685f-f6ff-7dd0-ada9-2ccfffb4bac4",
  pageTypeSlug: "finding",
  slug: "the-model-page-types-became-domains-and-one-design-line-was-reversed",
  domainSlug: "domain/akasha-migration",
  claim:
    "Neither `model.page-type.md` nor `image-generation-model.page-type.md` gets a page type in akasha, because akasha made a model a plain domain instead of a kind of page. `image-generation-model` needed nothing carried: its definition already stands as an invariant on `domain/image-generation`, and its one design line stands there reversed rather than absent. `model` needed its definition carried, so it landed as an invariant on `domain/model`. Both markdown pages then came down.",
  evidence:
    "Measured 2026-09-03. `akasha/image-generation/image-generation.domain.ts:12` reads \"A model that makes images is a domain whose subject is that one model.\", which is `image-generation-model`'s definition \"a domain whose subject is one model that makes images\" moved onto the parent. Line 16 reads \"What a model is loaded and sampled with is code rather than a page property.\", the exact contrary of the old page's design line \"What a model is loaded and sampled with stands in its properties, and nothing in code.\" — so that line is answered, not lost, and the newer answer wins. `akasha/image-generation/z-image-turbo.domain.ts` is the shape in practice: one image model, held as a domain page with `pageTypeSlug: \"domain\"`, not as a page of any model page type.

The old page's `files: akasha:**/*.image-generation-model.md` is a repo-wide glob naming the old system's file shape, so it names no successor and was not followed.

For `model`, a content search across akasha for \"trained network\" and for \"whose subject\" returns `repo.page-type.ts`, `list.page-type.ts` and the image-generation line above, and no statement that a model is a domain whose subject is one trained network. The instrument reads: the same search shape found \"one sound the system holds\" in `akasha/infrastructure/audios/audio.page-type.ts`. `akasha/agents/models/model.domain.ts` was already the successor of the old `domain/models` parent, holding `page-type/model-family` and `page-type/model-test` but no bare `model` page type, so the line belongs on it under the rule that an invariant true of every page below a domain belongs to the domain.",
} as const satisfies Finding

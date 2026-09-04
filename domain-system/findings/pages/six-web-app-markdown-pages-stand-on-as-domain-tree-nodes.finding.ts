import type { Finding } from "../finding.page-type.ts"

export const sixWebAppMarkdownPagesStandOnAsDomainTreeNodes = {
  id: "01a05b26-f8b6-755c-97a9-f336e15b0ca3",
  pageTypeSlug: "finding",
  slug: "six-web-app-markdown-pages-stand-on-as-domain-tree-nodes",
  domainSlug: "page-type/web-app",
  claim:
    "The six `*.web-app.md` pages were stripped of every fact akasha now states and left standing, because each is also a node the old system's domain tree and required reading hang off. Nothing a deploy reads is spelled twice any more, but two page types are still named `web-app`, one in each system.",
  evidence:
    "Each page kept `id`, `page-type-slug`, `title`, `slug`, `repo: akasha`, `domain-parent-slug`, `required-reading-slugs: [domain/browser]` and, for temper, `sequence-slugs`; `cluster-service-slugs` went, and with it the only fact akasha had taken over. Five pages under `pages/domain/` name a web app as their `domain-parent-slug` — `reader`, `temper-web-account`, `temper-web-catalog`, `temper-web-player`, `temper-web-tooling` — and `pages/domain/temper.domain.md` names `web-app/temper-web` in its sequence, so deleting the six would orphan six pages. `pages/page-type/web-app.page-type.md` states `extends-slug: package` and `files: akasha:**/*.web-app.md`, which is what makes each page the package page its source tree's required reading is found through. What would retire them is renaming that page type to `package`, moving the six to `pages/package/<slug>.package.md` under the same ids, and repointing those six references from `web-app/` to `package/`. That was judged the right end state and not worth landing tonight on a tree three agents were writing, since it touches the old system's required-reading gate and no intent depends on it.",
} as const satisfies Finding

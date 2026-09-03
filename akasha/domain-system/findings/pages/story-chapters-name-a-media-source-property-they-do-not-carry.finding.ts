import type { Finding } from "../finding.page-type.ts"

export const storyChaptersNameAMediaSourcePropertyTheyDoNotCarry = {
  id: "01a05cf4-03d5-77e6-9a28-a3dd08dfdb01",
  pageTypeSlug: "finding",
  slug: "story-chapters-name-a-media-source-property-they-do-not-carry",
  domainSlug: "router-app/alan-web",
  claim:
    "`story-chapter` states its audio is rendered from a property called `text`, and no story chapter carries one; the prose is under `body`. So every read-aloud read selects a property that is not there, gets null, and returns an empty body rather than refusing. Naming the page type fixed the throw; this is why the path still renders nothing.",
  evidence:
    'pages/page-type/story-chapter.page-type.media-config.attachment.json states `"sourcePropertyId": "text"`. It is the only media config in the tree.\n\n`getPropertyDefinitions({ pageTypeSlug: "story-chapter-written" })` returns 45 definitions and none has the key `text`. The prose is `body`, of type `template`. Four property definitions in pages/page-property-definition/ carry `key: text` and they are declared on `audio`, `game-turn`, `inference-run` and `log-line`, none of them a chapter.\n\nMeasured against a real chapter: `getPage({ pageTypeSlug: "story-chapter-written", where: [{key:"id",eq:id}], select: ["id","text"] })` answers with `text: null`, while the same page read without a select carries `body` at 23482 characters.\n\nSo `resolveChapterKokoroSegments` returns null and `resolveFromNSentenceMarks` returns no marks, both without complaining. That is the shape pages-system\'s own rule refuses: a true empty and a failure read alike, and only one of them is a fault.\n\nThe fix is one token, `text` to `body`, but it is a modelling call about what a chapter is read aloud from, and it should be made deliberately rather than guessed: it decides what gets rendered and stored under every audio object key.',
} as const satisfies Finding

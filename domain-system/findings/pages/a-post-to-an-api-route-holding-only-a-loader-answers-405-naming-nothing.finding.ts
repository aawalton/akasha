import type { Finding } from "../finding.page-type.ts"

export const aPostToAnApiRouteHoldingOnlyALoaderAnswers405NamingNothing = {
  id: "01a06233-591a-7e50-a81b-b072230c7baa",
  pageTypeSlug: "finding",
  slug: "a-post-to-an-api-route-holding-only-a-loader-answers-405-naming-nothing",
  domainSlug: "domain/alan-harness",
  claim:
    'A POST to an api route of Alan\'s site that declares only a `loader` answers 405 with the body `{"message":"Unexpected Server Error"}`, naming neither the path nor the method nor what is wrong. React Router raises this before any module of ours is entered, so no route can answer it from inside itself. Forty-two of the declared api routes answer this way. `/api/health` is one of them, and it is the second address a probe from this repository reached on 2026-09-02.',
  evidence:
    'Measured 2026-09-02 against a production build of `alanwalton/web` served by `bun run server.ts` on a workstation, over 138 GET and POST probes covering every route `app/routes.ts` declares.\n\n`POST /api/health` answers 405, content-type `application/json`, body `{"message":"Unexpected Server Error"}`. The workstation log carries the same line the pod carried: `You made a POST request to "/api/health" but did not provide an `action` for route "routes/api.health"`.\n\nAcross the 138 probes the log holds 42 of `did not provide an `action`` and 5 of `did not provide a `loader``, one for each declared api route holding only the other half.\n\n`getInternalRouterError` builds it in `react-router@7.15.1` at `dist/production/chunk-JAKZPQZC.mjs:5445`, and `handleResourceRequest` turns it into the answer. The route module is never entered, so a guard written inside one could never reach it.\n\nThe `api/*` route landed for the sibling defect does not reach these. It is ranked below every declared api route by design, so a real address keeps answering from its own route and only a wrong address falls to the 404.\n\nWhat closing it would take: an `action` on each api route holding only a `loader`, or one shared refusal imported by each of them. Forty-odd files, several of which sibling lanes hold open today.',
} as const satisfies Finding

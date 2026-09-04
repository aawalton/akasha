import type { Finding } from "../finding.page-type.ts"

export const addingARouteToAlanWebCostsTheRouteTablesOwnComment = {
  id: "01a06858-8cfa-7520-8959-a7bb74383314",
  pageTypeSlug: "finding",
  slug: "adding-a-route-to-alan-web-costs-the-route-tables-own-comment",
  domainSlug: "router-app/alan-web",
  claim:
    "A route added to Alan's site cannot be a file under `akasha/alan/web/routes/`, because no page claims one and `file-has-its-page` refuses it. It lands as a module beside the app instead. Registering it carries `routes.ts`, which `no-code-comments` then judges, so the table's own comment about where the api catch-all ranks had to go. Its usual home, `alan-web.router-app.ts`, cannot be carried: its `module/push-registration-sync` part narrows to two pages.",
  evidence:
    "Measured 2026-09-03 while adding the attributes tile's feed. The index answers no page for any path under `akasha/alan/web/routes/`, so not one of the 62 route files is claimed. A write of `routes/api.attribute-stoplights.ts` was refused with `no page claims this file`, and adding the route to `routes.ts` did not clear it. The route is now `module/attribute-stoplights` at `akasha/alan/web/attribute-stoplights/`, which is what `jennys-categorization-route-lands-as-a-module-since-no-route-page-type-stands` records as the call already taken for Jenny.\n\nThe deleted comment said: `api` is no page type, so without the catch-all the page catch-all above reads a wrong api address as a page and answers 500 rather than 404; it is ranked above `:pageTypeSlug/:pageHrefParam` and below every api route named. Nothing in akasha states that now.\n\nFiling it on `alan-web.router-app.ts` as invariants was tried and refused: that page states `module/push-registration-sync`, and a module of that slug sits at both `akasha/alan/web/push-registration-sync/` and `akasha/smilingjenny/smilingjenny-web/push-registration-sync/`. `relation-resolves` refuses a name narrowing to two pages, so no change to that page can land until one of the two is renamed. It is the same shape as `two-module-pages-now-share-the-slug-population-bound`.",
} as const satisfies Finding

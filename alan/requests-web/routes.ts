import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/requests-home/requests-home.route.code.tsx"),
    route(
      ":pageTypeSlug/:pageHrefParam",
      "routes/requests-page-detail/requests-page-detail.route.code.tsx"
    ),
    route(":pageTypeSlug", "routes/requests-page-listing/requests-page-listing.route.code.tsx"),
  ]),
  route("handover", "routes/requests-handover/requests-handover.route.code.ts"),
  route("sign-in", "routes/requests-sign-in/requests-sign-in.route.code.ts"),
  route("sign-up", "routes/requests-sign-up/requests-sign-up.route.code.tsx"),
  route("sign-out", "routes/requests-sign-out/requests-sign-out.route.code.ts"),
  route("api/health", "routes/requests-api-health/requests-api-health.route.code.ts"),
  route(
    "api/live-version",
    "routes/requests-api-live-version/requests-api-live-version.route.code.ts"
  ),
  route("api/errors", "routes/requests-api-errors/requests-api-errors.route.code.ts"),
  route("api/page-types", "routes/requests-api-page-types/requests-api-page-types.route.code.ts"),
  route("api/pages/:pageTypeSlug", "routes/requests-api-pages/requests-api-pages.route.code.ts"),
  route("api/page-write", "routes/requests-api-page-write/requests-api-page-write.route.code.ts"),
  route("api/requests", "routes/requests-api-requests/requests-api-requests.route.code.ts"),
  route(
    "api/nav-icon/:idSuffix",
    "routes/requests-api-nav-icon/requests-api-nav-icon.route.code.ts"
  ),
] satisfies RouteConfig

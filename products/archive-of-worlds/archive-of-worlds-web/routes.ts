import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/archive-of-worlds-home/archive-of-worlds-home.route.code.tsx"),
    route(
      ":pageTypeSlug/:pageHrefParam",
      "routes/archive-of-worlds-page-detail/archive-of-worlds-page-detail.route.code.tsx"
    ),
    route(
      ":pageTypeSlug",
      "routes/archive-of-worlds-page-listing/archive-of-worlds-page-listing.route.code.tsx"
    ),
  ]),
  route("sign-in", "routes/archive-of-worlds-sign-in/archive-of-worlds-sign-in.route.code.tsx"),
  route("sign-up", "routes/archive-of-worlds-sign-up/archive-of-worlds-sign-up.route.code.tsx"),
  route("sign-out", "routes/archive-of-worlds-sign-out/archive-of-worlds-sign-out.route.code.ts"),
  route(
    "api/health",
    "routes/archive-of-worlds-api-health/archive-of-worlds-api-health.route.code.ts"
  ),
  route(
    "api/live-version",
    "routes/archive-of-worlds-api-live-version/archive-of-worlds-api-live-version.route.code.ts"
  ),
  route(
    "api/errors",
    "routes/archive-of-worlds-api-errors/archive-of-worlds-api-errors.route.code.ts"
  ),
  route(
    "api/page-types",
    "routes/archive-of-worlds-api-page-types/archive-of-worlds-api-page-types.route.code.ts"
  ),
  route(
    "api/pages/:pageTypeSlug",
    "routes/archive-of-worlds-api-pages/archive-of-worlds-api-pages.route.code.ts"
  ),
  route(
    "api/page-write",
    "routes/archive-of-worlds-api-page-write/archive-of-worlds-api-page-write.route.code.ts"
  ),
  route(
    "api/nav-icon/:idSuffix",
    "routes/archive-of-worlds-api-nav-icon/archive-of-worlds-api-nav-icon.route.code.ts"
  ),
] satisfies RouteConfig

import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/home.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
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
  route("api/pages/:pageTypeSlug", "routes/api.pages.$pageTypeSlug.ts"),
  route("api/page-write", "routes/api.page-write.ts"),
  route("api/nav-icon/:idSuffix", "routes/api.nav-icon.$idSuffix.ts"),
] satisfies RouteConfig

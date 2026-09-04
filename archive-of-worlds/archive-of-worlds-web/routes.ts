import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    index("routes/home.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("sign-out", "routes/sign-out.ts"),
  route("api/health", "routes/api.health.ts"),
  route("api/live-version", "routes/api.live-version.ts"),
  route("api/errors", "routes/api.errors.ts"),
  route("api/page-types", "routes/api.page-types.ts"),
  route("api/pages/:pageTypeSlug", "routes/api.pages.$pageTypeSlug.ts"),
  route("api/page-write", "routes/api.page-write.ts"),
  route("api/nav-icon/:idSuffix", "routes/api.nav-icon.$idSuffix.ts"),
] satisfies RouteConfig

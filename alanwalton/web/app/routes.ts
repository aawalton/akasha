import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

export default [
  layout("routes/_app-layout.tsx", [
    route("home", "routes/home.tsx"),
    route("principles", "routes/principles.tsx"),
    route("design", "routes/design.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
    route(":pageTypeSlug", "routes/page-listing.tsx"),
  ]),
  index("routes/landing.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services.tsx"),
  route("contact", "routes/contact.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("sms", "routes/sms.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("sign-out", "routes/sign-out.ts"),
  route("idle", "routes/idle.ts"),
  route("api/health", "routes/api.health.ts"),
  route("api/live-version", "routes/api.live-version.ts"),
  route("api/errors", "routes/api.errors.ts"),
  route("api/claude-usage", "routes/api.claude-usage.ts"),
  route("api/inbox-stoplights", "routes/api.inbox-stoplights.ts"),
  route("api/habit-stoplights", "routes/api.habit-stoplights.ts"),
  route("api/surplus", "routes/api.surplus.ts"),
  route("api/safety-level", "routes/api.safety-level.ts"),
  route("api/categorization", "routes/api.categorization.ts"),
  route("api/readout-relay", "routes/api.readout-relay.ts"),
  route("api/sms/webhook", "routes/api.sms.webhook.ts"),
  route("api/sms/opt-in", "routes/api.sms.opt-in.ts"),
  route("api/spotify/callback", "routes/api.spotify.callback.ts"),
  route("api/page-types", "routes/api.page-types.ts"),
  route("api/pages/:pageTypeSlug", "routes/api.pages.$pageTypeSlug.ts"),
  route("api/page-write", "routes/api.page-write.ts"),
  route("api/nav-icon/:idSuffix", "routes/api.nav-icon.$idSuffix.ts"),
  route("api/image/:imageId", "routes/api.image.$imageId.ts"),
  route("api/wallpaper", "routes/api.wallpaper.ts"),
  route("api/property-option", "routes/api.property-option.ts"),
  route("api/media/token", "routes/api.media.token.ts"),
  route("api/media/:pageId/variants", "routes/api.media.$pageId.variants.ts"),
  route("api/media/:pageId/:medium/stream", "routes/api.media.$pageId.$medium.stream.ts"),
  route("api/media/:pageId/:medium/ensure", "routes/api.media.$pageId.$medium.ensure.ts"),
  route("api/media/:pageId/:medium/marks", "routes/api.media.$pageId.$medium.marks.ts"),
  route("api/media/:pageId/:medium/hls.m3u8", "routes/api.media.$pageId.$medium.hls.m3u8.ts"),
  route(
    "api/media/:pageId/:medium/hls/:segment",
    "routes/api.media.$pageId.$medium.hls.$segment.ts"
  ),
  route("api/media/:pageId/:medium", "routes/api.media.$pageId.$medium.ts"),
  route("api/load", "routes/api.load.ts"),
  route("api/save", "routes/api.save.ts"),
  route("api/catalog", "routes/api.catalog.ts"),
  route("api/session/:externalId", "routes/api.session.$externalId.ts"),
  route("api/awen-game/:externalId", "routes/api.awen-game.$externalId.ts"),
  route("api/action", "routes/api.action.ts"),
  route("api/awen/read/:externalId", "routes/api.awen.read.$externalId.ts"),
  route("api/chess/analyze", "routes/api.chess.analyze.ts"),

  route("api/question/resolve", "routes/api.question.resolve.ts"),

  route("api/push/register", "routes/api.push.register.ts"),

  route("api/device-secret/admission", "routes/api.device-secret.admission.ts"),
  route("api/device-secret/mint", "routes/api.device-secret.mint.ts"),
  route("api/device-secret/revoke", "routes/api.device-secret.revoke.ts"),

  route("api/tracking/health-samples", "routes/api.tracking.health-samples.ts"),

  // Anything else under `/api/`. `api` is no page type, so without this the page catch-all above
  // reads a wrong api address as a page and answers 500 rather than 404. Ranked between the two:
  // above `:pageTypeSlug/:pageHrefParam`, below every api route named here.
  route("api/*", "routes/api.$.ts"),
] satisfies RouteConfig

export function loader(): Response {
  return Response.json({ ok: true, builtByAkashaDeploy: true })
}

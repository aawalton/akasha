const NOT_FOUND = 404

export function loader(): never {
  throw new Response(null, { status: NOT_FOUND })
}

export default function JennyNoSuchPage() {
  return null
}

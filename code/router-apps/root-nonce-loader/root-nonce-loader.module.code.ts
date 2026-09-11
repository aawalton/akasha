export async function rootNonceLoader({ context }: { context: { nonce?: string } }) {
  return { nonce: context.nonce }
}

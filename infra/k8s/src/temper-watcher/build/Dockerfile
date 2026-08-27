FROM rust:1.95-alpine3.23 AS rust-builder
ARG COMMIT_SHA
ENV COMMIT_SHA=${COMMIT_SHA}
RUN apk add --no-cache mingw-w64-gcc musl-dev
RUN rustup target add x86_64-pc-windows-gnu
WORKDIR /build
COPY temper-watcher/tray/Cargo.toml ./Cargo.toml
COPY temper-watcher/tray/build.rs ./build.rs
COPY temper-watcher/tray/src ./src
COPY temper-watcher/tray/assets ./assets
RUN mkdir -p .cargo && \
    echo '[target.x86_64-pc-windows-gnu]' > .cargo/config.toml && \
    echo 'linker = "x86_64-w64-mingw32-gcc"' >> .cargo/config.toml && \
    echo 'ar = "x86_64-w64-mingw32-ar"' >> .cargo/config.toml
RUN cargo build --target=x86_64-pc-windows-gnu --release

FROM oven/bun:1.3.14-alpine AS worker-builder
ARG COMMIT_SHA
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV COMMIT_SHA=${COMMIT_SHA}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
WORKDIR /workspace
COPY . .
RUN bun install --frozen-lockfile
RUN mkdir -p /out && \
    bun build --compile --target=bun-windows-x64 \
      --define "__WATCHER_VERSION__=\"${COMMIT_SHA}\"" \
      --define "__SUPABASE_URL__=\"https://supabase.alanwalton.com\"" \
      --define "__SUPABASE_ANON_KEY__=\"${NEXT_PUBLIC_SUPABASE_ANON_KEY}\"" \
      --outfile=/out/temper-watcher-worker.exe \
      temper/scripts/src/watcher-exe/main.ts && \
    echo "${COMMIT_SHA}" > /out/version.txt

FROM alpine:3.22 AS final
RUN mkdir -p /build
COPY --from=rust-builder /build/target/x86_64-pc-windows-gnu/release/temper-watcher.exe /build/temper-watcher.exe
COPY --from=worker-builder /out/temper-watcher-worker.exe /build/temper-watcher-worker.exe
COPY --from=worker-builder /out/version.txt /build/version.txt
